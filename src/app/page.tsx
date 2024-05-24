import { Toaster } from "sonner";
import { BlackSection } from "./_components/BlackSection";
import { HeroSection } from "./_components/HeroSection";
import { OffersSection } from "./_components/OffersSection";

import "@styles/HomePage.css";

export default function HomePage() {
  return (
    <section>
      <HeroSection />

      <BlackSection />

      <OffersSection />

      <Toaster richColors />
    </section>
  );
}
