import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

const controlClasses =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";

function Wrapper({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input({
  label,
  id,
  className = "",
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper label={label} htmlFor={id}>
      <input id={id} className={`${controlClasses} ${className}`} {...props} />
    </Wrapper>
  );
}

export function Textarea({
  label,
  id,
  className = "",
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper label={label} htmlFor={id}>
      <textarea id={id} className={`${controlClasses} ${className}`} rows={3} {...props} />
    </Wrapper>
  );
}

export function Select({
  label,
  id,
  className = "",
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper label={label} htmlFor={id}>
      <select id={id} className={`${controlClasses} ${className}`} {...props}>
        {children}
      </select>
    </Wrapper>
  );
}
