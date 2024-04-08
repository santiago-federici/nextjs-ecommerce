import { Button } from "../Button";
import { Carousel } from "./Carousel";
import { HomeSection } from "./HomeSection";
import { SectionTitle } from "./SectionTitle";

export function Trending () {
  return(
    <HomeSection>
      <SectionTitle title="Trending" />

      <Carousel />

      <Button as="primary" text="Ir a productos" />
    </HomeSection>
  )
}