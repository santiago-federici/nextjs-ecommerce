import { Toaster } from "sonner";
import { HeroSection } from "./_components/HeroSection";
import { OffersSection } from "./_components/OffersSection";
import { NewestAdditionsSection } from "./_components/NewestAdditionsSection";
import { CategoriesSection } from "./_components/CategoriesSection";

import "@styles/HomePage.css";

export default async function HomePage() {
  return (
    <section>
      <HeroSection />

      <OffersSection />

      <NewestAdditionsSection />

      <CategoriesSection />

      <Toaster richColors />
    </section>
  );
}
