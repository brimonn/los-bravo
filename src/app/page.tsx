import { Hero } from "@/components/sections/Hero";
import { FeaturedMenu } from "@/components/sections/FeaturedMenu";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <Reviews />
      <Location />
      <FinalCta />
    </>
  );
}
