import { BlackSection } from "@components/HomePage/BlackSection";
import { HeroSection } from "@components/HomePage/HeroSection";
import { OffersSection } from "@components/HomePage/OffersSection";

import '@styles/HomePage.css'

export default function Home() {
  return (
    <main>

      <HeroSection />

      <BlackSection />

      <OffersSection />

    </main>
  );
}
