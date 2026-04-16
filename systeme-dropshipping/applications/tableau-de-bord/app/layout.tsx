/**
 * Layout racine — sidebar persistante + zone de contenu principale.
 */
import type { Metadata } from "next";
import "./globals.css";

import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dropship Console",
  description:
    "Tableau de bord du système multi-agent dropshipping (Anthropic + Supabase + Shopify + Meta/TikTok)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-neutral-50 antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-x-auto">
            <div className="mx-auto max-w-7xl px-8 py-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
