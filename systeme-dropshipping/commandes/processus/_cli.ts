/**
 * Helpers partagés pour les scripts processus/* :
 *   - parsing de flags --key=value (ou --flag boolean)
 *   - print JSON ou rapport coloré
 *   - codes de sortie cohérents
 */
export interface RawArgs {
  flags: Record<string, string | boolean>;
  rest: string[];
}

export function parseFlags(argv: string[]): RawArgs {
  const flags: Record<string, string | boolean> = {};
  const rest: string[] = [];
  for (const a of argv) {
    if (a.startsWith("--")) {
      const eq = a.indexOf("=");
      if (eq > 0) flags[a.slice(2, eq)] = a.slice(eq + 1);
      else flags[a.slice(2)] = true;
    } else {
      rest.push(a);
    }
  }
  return { flags, rest };
}

export function getString(args: RawArgs, key: string): string | null {
  const v = args.flags[key];
  return typeof v === "string" ? v : null;
}

export function getNumber(args: RawArgs, key: string): number | null {
  const v = args.flags[key];
  if (typeof v !== "string") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function getBool(args: RawArgs, key: string, fallback: boolean): boolean {
  const v = args.flags[key];
  if (v === undefined) return fallback;
  if (typeof v === "boolean") return v;
  return v === "true" || v === "1";
}

export function getList(args: RawArgs, key: string): string[] {
  const v = args.flags[key];
  if (typeof v !== "string") return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

export function printSuccess(label: string, payload: unknown, json: boolean): void {
  if (json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  console.log(`\n${C.green}✓${C.reset} ${C.bold}${label}${C.reset}\n`);
  console.log(JSON.stringify(payload, null, 2));
  console.log("");
}

export function fatal(err: unknown): never {
  const msg = err instanceof Error ? err.stack ?? err.message : String(err);
  console.error(`\n${C.red}❌  Échec${C.reset}\n${msg}\n`);
  process.exit(1);
}
