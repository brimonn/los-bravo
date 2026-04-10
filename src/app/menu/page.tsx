import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  categoryLabels,
  categoryOrder,
  getItemsByCategory,
} from "@/data/menu";
import { ProductCard } from "@/components/ProductCard";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Menú completo | Los Bravo",
  description: `Hamburguesas, alitas, combos y bebidas en ${SITE.name}, Liberia.`,
};

export default function MenuPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&q=75"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-bravo-black/88" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-bravo-muted transition hover:text-bravo-red"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-bravo-red">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-wide text-white md:text-6xl">
            MENÚ COMPLETO
          </h1>
          <p className="mt-4 max-w-xl text-bravo-muted">
            Precios referenciales. Consultá disponibilidad y promos del día por WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <nav
          className="sticky top-[var(--header-offset)] z-40 -mx-4 mb-8 flex flex-wrap gap-2 border-b border-white/10 bg-bravo-black/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:gap-3 md:py-3.5"
          aria-label="Categorías del menú"
        >
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-bravo-red hover:bg-bravo-red/10"
            >
              {categoryLabels[cat]}
            </a>
          ))}
        </nav>

        <div className="space-y-16 md:space-y-20">
          {categoryOrder.map((cat) => {
            const items = getItemsByCategory(cat);
            return (
              <section
                key={cat}
                id={cat}
                className="scroll-mt-[calc(var(--header-offset)+6rem)]"
              >
                <h2 className="font-display text-3xl tracking-wide text-white md:text-4xl">
                  {categoryLabels[cat].toUpperCase()}
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center border-t border-white/10 pt-12">
          <Link
            href="/"
            className="text-sm font-semibold text-bravo-red underline-offset-4 transition hover:underline"
          >
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}
