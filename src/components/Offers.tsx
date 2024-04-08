import { Button } from "./Button";
import { Carousel } from "./Carousel";
import { HomeSection } from "./HomeSection";
import { SectionTitle } from "./SectionTitle";

import '@styles/Offers.css'

export function Offers () {
  return (
    <HomeSection extraClassName="py-8">
      <div className="bg-accent absolute w-[100svw] h-full top-0 z-1 rounded-corners"></div>

      <SectionTitle title="Ofertas" />

      <Carousel />

      <Button as="primary" text="Ver ofertas" />
    </HomeSection>
  )
}