import { redirect } from "next/navigation";

// Point d'entrée : on ouvre directement sur le référentiel patrimoine (Module 1).
// Le dashboard (Module 7) prendra cette place ultérieurement.
export default function Home() {
  redirect("/portfolios");
}
