"use client";

import { getWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/components/LanguageProvider";

export function FinalCta() {
  const { language } = useLanguage();
  const copy = {
    es: {
      title: "¿LISTO PARA ORDENAR?",
      description: "Te esperamos en Los Bravo. Escribinos y disfruta de un servicio de calidad.",
      cta: "Pedir por WhatsApp",
    },
    en: {
      title: "READY TO ORDER?",
      description: "We are waiting for you at Los Bravo. Message us and enjoy great service.",
      cta: "Order via WhatsApp",
    },
  }[language];

  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-bravo-red/30 bg-linear-to-br from-bravo-red-dark via-bravo-red to-bravo-red-dark py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-4xl tracking-wide text-white md:text-5xl lg:text-6xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-lg text-white/90 md:text-xl">
          {copy.description}
        </p>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex min-h-[3.5rem] w-full items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-bravo-red shadow-xl transition hover:bg-bravo-white hover:shadow-2xl sm:w-auto"
        >
          {copy.cta}
        </a>
      </div>
    </section>
  );
}
