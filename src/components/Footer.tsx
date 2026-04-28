"use client";

import Link from "next/link";
import { SITE, getWhatsAppUrl } from "@/lib/constants";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { language } = useLanguage();

  const copy = {
    es: {
      fullMenu: "Menú completo",
      location: "Ubicación",
    },
    en: {
      fullMenu: "Full menu",
      location: "Location",
    },
  }[language];

  return (
    <footer className="border-t border-white/10 bg-bravo-black py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:text-left sm:px-6">
        <div>
          <p className="font-display text-xl tracking-wide text-white">
            LOS BRAVO <span className="text-bravo-red">LIBERIA</span>
          </p>
          <p className="mt-1 text-sm text-bravo-muted">{SITE.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/menu" className="text-bravo-muted hover:text-white">
            {copy.fullMenu}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bravo-muted hover:text-white"
          >
            WhatsApp
          </a>
          <a href="/#ubicacion" className="text-bravo-muted hover:text-white">
            {copy.location}
          </a>
        </div>
      </div>
    </footer>
  );
}
