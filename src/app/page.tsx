import { Toaster } from "sonner";
import { HeroSection } from "./_components/HeroSection";
import { OffersSection } from "./_components/OffersSection";
import { NewSection } from "./_components/NewSection";
import { CategoriesSection } from "./_components/CategoriesSection";

import "@styles/HomePage.css";

export default async function HomePage() {
  return (
    <section>
      <HeroSection />

      <OffersSection />

      <NewSection />

      <CategoriesSection />

      <Toaster richColors />
    </section>
  );
}
