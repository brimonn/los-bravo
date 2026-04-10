
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


export const MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Los+Bravo/@10.6433955,-85.4320951,1068m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8f757d8ededd1cf3:0xda9d72efb3c85587!8m2!3d10.6433902!4d-85.4295202!16s%2Fg%2F11m6x1jhwv";


export const MAPS_COORDINATES = {
  lat: 10.6433902,
  lng: -85.4295202,
} as const;


export const MAPS_EMBED_IFRAME_SRC: string | null = null;


const MAPS_EMBED_PB =
  "!1m18!1m12!1m3!1d3926.723!2d-85.4295202!3d10.6433902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f757d8ededd1cf3%3A0xda9d72efb3c85587!2sLos%20Bravo!5e0!3m2!1ses!2scr!4v1735689600!5m2!1ses!2scr";

export function getMapsOpenUrl(): string {
  return MAPS_PLACE_URL;
}

export function getMapsEmbedUrl(): string {
  if (MAPS_EMBED_IFRAME_SRC) return MAPS_EMBED_IFRAME_SRC;
  return `https://www.google.com/maps/embed?pb=${MAPS_EMBED_PB}`;
}
