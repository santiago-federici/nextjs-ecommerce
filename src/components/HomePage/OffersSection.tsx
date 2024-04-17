import { Card } from "@components/Card";
import { HomeSection } from "./HomeSection";
import { Button } from "@components/CustomButtons";
import prods from '@mocks/prods.json'
// import { CarouselContainer } from "@components/CarouselContainer";

const sectionInfo ={
  title: 'Best offers',
  btnText: 'See offers'
}

export function OffersSection () {
  const discountedProds = prods.filter(prod => prod.isOffer);

  const highestDiscounts = discountedProds.sort((a, b) => (b.isOffer || 0) - (a.isOffer || 0));

  const limitedProds = highestDiscounts.slice(0, 3);
  
  return(
    <HomeSection bgColor="surface" extraClassname="gap-12 lg:gap-16">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-accent">{sectionInfo.title}</h3>

      {/* <CarouselContainer /> */}

      <ul className="w-full grid lg:place-content-center offers-grid gap-4 lg:my-8">
        {
          limitedProds.map((prod, index) => (
            <li
              key={index}
            >
              <Card id={prod.id} />
            </li>
          ))
        }
      </ul>
      
      <Button as="primary" text={sectionInfo.btnText} />
    </HomeSection>
  )
}