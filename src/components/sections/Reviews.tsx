import { reviews } from "@/data/reviews";
import { StarRating } from "@/components/StarRating";

export function Reviews() {
  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-bravo-red">
            Opiniones reales
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-wide text-white md:text-5xl">
            LA GENTE LO DICE
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote
              key={r.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-bravo-black-soft p-6 transition hover:border-bravo-red/30 md:p-8"
            >
              <StarRating value={r.rating} />
              <p className="mt-4 flex-1 text-base leading-relaxed text-bravo-white/90">
                &ldquo;{r.text}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-bravo-red/20 text-sm font-bold text-bravo-red">
                  {r.author
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-white">{r.author}</cite>
                  <p className="text-sm text-bravo-muted">{r.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
