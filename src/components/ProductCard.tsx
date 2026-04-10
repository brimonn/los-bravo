import Image from "next/image";
import type { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem;
  className?: string;
};

export function ProductCard({ item, className = "" }: Props) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bravo-black-soft transition hover:border-bravo-red/40 hover:shadow-[0_0_40px_rgba(227,24,55,0.12)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bravo-black/80 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-2xl tracking-wide text-white md:text-[1.65rem]">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-md bg-bravo-red/20 px-2.5 py-1 text-sm font-semibold text-bravo-red">
            {item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-bravo-muted">{item.description}</p>
      </div>
    </article>
  );
}
