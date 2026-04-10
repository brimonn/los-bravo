import Image from "next/image";

const LOGO_SRC = "/logo-los-bravo.svg";

type LogoBravoProps = {
  className?: string;
  /** Navbar above the fold */
  priority?: boolean;
};

export function LogoBravo({ className = "", priority = false }: LogoBravoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Los Bravo Liberia"
      width={360}
      height={96}
      priority={priority}
      sizes="(max-width: 768px) 300px, 360px"
      className={`h-[60px] w-auto max-w-none object-contain object-left md:h-[72px] ${className}`}
    />
  );
}
