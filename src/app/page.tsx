import { Toaster } from "sonner";
import { BlackSection } from "./_components/BlackSection";
import { HeroSection } from "./_components/HeroSection";
import { OffersSection } from "./_components/OffersSection";
import { CategoriesSection } from "./_components/CategoriesSection";

import "@styles/HomePage.css";

export default async function HomePage() {
  return (
    <section>
      <HeroSection />

      <BlackSection />

      <OffersSection />

      <CategoriesSection />

      <Toaster richColors />
    </section>
  );
}
