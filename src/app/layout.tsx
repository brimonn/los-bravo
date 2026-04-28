import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE, getWhatsAppUrl } from "@/lib/constants";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Los Bravo",
  description: SITE.tagline,
  openGraph: {
    title: "Los Bravo",
    description: SITE.tagline,
    locale: "es_CR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${bebas.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <Navbar whatsappHref={getWhatsAppUrl()} />
          <div className="flex flex-1 flex-col pt-[var(--header-offset)]">
            {children}
            <Footer />
          </div>
          <WhatsAppFloat href={getWhatsAppUrl()} />
        </LanguageProvider>
      </body>
    </html>
  );
}
