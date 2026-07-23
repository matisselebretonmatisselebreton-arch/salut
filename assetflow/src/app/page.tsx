import { redirect } from "next/navigation";

// Point d'entrée : le tableau de bord de pilotage (Module 7).
export default function Home() {
  redirect("/dashboard");
}
