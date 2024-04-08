import { HeroSection } from "@components/HomePage/HeroSection";
import { Offers } from "@components/HomePage/Offers";
import { Trending } from "@components/HomePage/Trending";

export default function Home() {
  return (
    <main className="wrapper">

      <HeroSection />

      <Trending />

      <Offers />
    </main>
  );
}
