import { HeroSection } from "@components/HeroSection";
import { Trending } from "@components/Trending";

export default function Home() {
  return (
    <main className="wrapper">
      <HeroSection />

      <Trending />
    </main>
  );
}
