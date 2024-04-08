import { Breadcrumbs } from "@components/Breadcrumbs";
import { HeroSection } from "@components/HeroSection";
import { Offers } from "@components/Offers";
import { Trending } from "@components/Trending";

export default function Home() {
  return (
    <main className="wrapper">
      <Breadcrumbs />
      
      <HeroSection />

      <Trending />

      <Offers />
    </main>
  );
}
