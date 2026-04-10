import { SITE, getMapsEmbedUrl, getMapsOpenUrl } from "@/lib/constants";

export function Location() {
  return (
    <section
      id="ubicacion"
      className="scroll-mt-24 border-t border-white/10 bg-bravo-black-soft py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-bravo-red">
            Visítanos
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white md:text-5xl">
            UBICACIÓN
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-bravo-muted">
                Dirección
              </h3>
              <p className="mt-2 text-lg text-white">{SITE.address}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold uppercase tracking-wider text-bravo-muted">
                Horario
              </h3>
              <div className="mt-2 max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <p className="inline-block text-lg whitespace-nowrap text-white">
                  {SITE.hours}
                </p>
              </div>
            </div>
            <a
              href={getMapsOpenUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full min-h-[3rem] items-center justify-center rounded-full bg-bravo-red px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-bravo-red-dark sm:w-auto sm:self-start"
            >
              Cómo llegar
            </a>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] sm:min-h-[320px] lg:min-h-[360px]">
            <iframe
              title="Mapa — Los Bravo Liberia"
              src={getMapsEmbedUrl()}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
