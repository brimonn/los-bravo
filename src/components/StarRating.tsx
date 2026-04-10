export function StarRating({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < full ? "text-bravo-red" : "text-white/20"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 13.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
