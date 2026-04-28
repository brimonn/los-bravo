"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoBravo } from "@/components/LogoBravo";
import { useLanguage } from "@/components/LanguageProvider";

type NavbarProps = {
  whatsappHref: string;
};

export function Navbar({ whatsappHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const copy = {
    es: {
      home: "Inicio",
      menu: "Menú",
      location: "Ubicación",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      orderByWhatsapp: "Ordenar por WhatsApp",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      menuAria: "Menú",
    },
    en: {
      home: "Home",
      menu: "Menu",
      location: "Location",
      contact: "Contact",
      whatsapp: "WhatsApp",
      orderByWhatsapp: "Order via WhatsApp",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuAria: "Menu",
    },
  }[language];

  const links = [
    { href: "/", label: copy.home },
    { href: "/menu", label: copy.menu },
    { href: "/#ubicacion", label: copy.location },
    { href: "/#contacto", label: copy.contact },
  ] as const;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-bravo-black/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[5.25rem] max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 md:min-h-[6.25rem] md:px-6 md:py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center justify-start transition-opacity hover:opacity-90"
          onClick={() => setOpen(false)}
          aria-label="Los Bravo Liberia — inicio"
        >
          <LogoBravo priority />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-bravo-muted transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-bravo-red px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_var(--bravo-red-glow)] transition hover:bg-bravo-red-dark hover:shadow-[0_0_32px_var(--bravo-red-glow)]"
          >
            {copy.whatsapp}
          </a>
          <div className="inline-flex rounded-full border border-white/20 p-1">
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${language === "es" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
              aria-label="Cambiar idioma a español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${language === "en" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
              aria-label="Switch language to English"
            >
              EN
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-bravo-red/50 hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-label={open ? copy.closeMenu : copy.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{copy.menuAria}</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`border-t border-white/10 bg-bravo-black md:hidden ${open ? "max-h-[28rem] opacity-100" : "max-h-0 overflow-hidden opacity-0"} transition-all duration-300 ease-out`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-bravo-white transition hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-bravo-red py-3.5 text-center text-base font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            {copy.orderByWhatsapp}
          </a>
          <div className="mt-2 inline-flex max-w-fit rounded-full border border-white/20 p-1">
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${language === "es" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
              aria-label="Cambiar idioma a español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${language === "en" ? "bg-white text-black" : "text-white/80 hover:text-white"}`}
              aria-label="Switch language to English"
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
