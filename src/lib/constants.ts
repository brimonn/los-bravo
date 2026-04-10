/** Número WhatsApp sin + ni espacios (Costa Rica: 506 + 8 dígitos). */
export const WHATSAPP_PHONE = "50683639441";

export const WHATSAPP_MESSAGE = "Hola me gustaría ordenar!";

export function getWhatsAppUrl(text?: string): string {
  const msg = encodeURIComponent(text ?? WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}

export const SITE = {
  name: "Los Bravo Liberia",
  tagline: "Las mejores alitas y hamburguesas de Liberia",
  address: "Av. Central, 50 m norte del Parque Central, Liberia, Guanacaste",
  hours: "Lunes — Domingo · 11:00 a.m. — 10:00 p.m.",
} as const;

/** Texto que usa Google para ubicar el local (nombre + dirección). */
export function getMapsSearchQuery(): string {
  return `${SITE.name}, ${SITE.address}`;
}

/** Enlace “Cómo llegar” en Google Maps. */
export function getMapsOpenUrl(): string {
  const q = encodeURIComponent(getMapsSearchQuery());
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/**
 * URL del iframe del mapa (misma búsqueda que “Cómo llegar”).
 * Si Google sigue mostrando otro pin, en Maps: tu negocio → Compartir → Insertar mapa, y pega aquí el `src` del iframe.
 */
export function getMapsEmbedUrl(): string {
  const q = encodeURIComponent(getMapsSearchQuery());
  return `https://www.google.com/maps?q=${q}&z=18&output=embed&hl=es`;
}
