import { Button } from "../Button";
import { Carousel } from "./Carousel";
import { HomeSection } from "./HomeSection";
import { SectionTitle } from "./SectionTitle";

import '@styles/Offers.css'

export function Offers () {
  return (
    <HomeSection extraClassName="py-8">
      <div className="bg-surface-elevated absolute w-[95svw] h-full top-0 z-1 rounded-corners rounded-xl"></div>

      <SectionTitle title="Ofertas" />

      <Carousel />

      <Button as="primary" text="Ver ofertas" />
    </HomeSection>
  )
}