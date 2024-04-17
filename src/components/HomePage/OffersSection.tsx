import { HomeSection } from "./HomeSection";
import { Button } from "@components/CustomButtons";
import { CarouselContainer } from "@components/CarouselContainer";

const sectionInfo ={
  title: 'Offers',
  btnText: 'See offers'
}

export function OffersSection () {
  return(
    <HomeSection bgColor="surface" extraClassname="gap-12 lg:gap-16">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-accent">{sectionInfo.title}</h3>

      <CarouselContainer />
      
      <Button as="primary" text={sectionInfo.btnText} />
    </HomeSection>
  )
}