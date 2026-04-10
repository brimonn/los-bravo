import Image from "next/image";
import Link from "next/link";
import { SITE, getWhatsAppUrl } from "@/lib/constants";

export function Hero() {
  /** Un solo pantallazo bajo el navbar: la siguiente sección no asoma hasta hacer scroll */
  const heroMin = "min-h-[calc(100svh-var(--header-offset))]";

  return (
    <section className={`relative ${heroMin} overflow-hidden`}>
      <Image
        src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=85"
        alt="Hamburguesas y comida rápida Los Bravo Liberia"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-bravo-black/75 md:bg-bravo-black/65" />
      <div className="absolute inset-0 bg-linear-to-t from-bravo-black via-bravo-black/40 to-transparent" />

      <div
        className={`relative mx-auto flex max-w-6xl flex-col justify-end gap-8 px-4 pb-16 pt-24 sm:px-6 md:justify-center md:pb-24 md:pt-24 ${heroMin}`}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-bravo-red">
          Comida rápida · Liberia
        </p>
        <h1 className="font-display text-5xl leading-[0.92] tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block">LOS BRAVO</span>
          <span className="block text-bravo-red">LIBERIA</span>
        </h1>
        <p className="max-w-xl text-base font-medium leading-relaxed text-white/80">
          {SITE.tagline}
        </p>
        <p className="max-w-xl border-l-4 border-bravo-red pl-4 text-base font-semibold leading-snug text-white md:text-lg">
          Servicio express disponible
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-bravo-red px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_32px_var(--bravo-red-glow)] transition hover:bg-bravo-red-dark hover:shadow-[0_0_48px_var(--bravo-red-glow)] active:scale-[0.98]"
          >
            Ordenar por WhatsApp
          </a>
          <Link
            href="/menu"
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full border-2 border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-bravo-red hover:bg-white/10"
          >
            Ver menú
          </Link>
        </div>
      </div>
    </section>
  );
}
