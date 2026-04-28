"use client";

import Link from "next/link";
import { getFeaturedItems } from "@/data/menu";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/components/LanguageProvider";

export function FeaturedMenu() {
  const items = getFeaturedItems();
  const { language } = useLanguage();
  const copy = {
    es: {
      kicker: "Favoritos del local",
      description: "Un adelanto de lo que pedimos todos los días. El menú completo está a un clic.",
      cta: "Ver menú completo",
    },
    en: {
      kicker: "Local favorites",
      description: "A preview of what customers order every day. The full menu is one click away.",
      cta: "See full menu",
    },
  }[language];

  return (
    <section
      id="menu-destacado"
      className="scroll-mt-24 border-t border-white/10 bg-bravo-black-soft py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-bravo-red">
              {copy.kicker}
            </p>
            <h2 className="mt-2 font-display text-4xl tracking-wide text-white md:text-5xl">
              DESTACADOS
            </h2>
            <p className="mt-3 max-w-lg text-bravo-muted">
              {copy.description}
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <Link
            href="/menu"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border-2 border-bravo-red bg-bravo-red px-10 py-3.5 text-base font-bold uppercase tracking-wider text-white transition hover:bg-transparent hover:text-bravo-red"
          >
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
