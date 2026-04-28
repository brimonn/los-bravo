import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import MenuPageClient from "@/app/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menú completo | Los Bravo",
  description: `Hamburguesas, alitas, combos y bebidas en ${SITE.name}, Liberia.`,
};

export default function MenuPage() {
  return <MenuPageClient />;
}
