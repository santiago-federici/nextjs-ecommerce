import { HomeSection } from "./HomeSection";
import { Button } from "@components/Button";
import { Carousel } from "@components/Carousel";

const sectionInfo ={
  title: 'Offers',
  btnText: 'See offers'
}

const offerProds = [
  {
    prodName: 'Nike Dri-Fit Strike',
    price: 53.499,
    prevPrice: 60.499,
    image: '/Nike-DriFit-Strike.webp',
    isOffer: 40
  },
  {
    prodName: 'Nike Trail Solar Chase',
    price: 45.499,
    prevPrice: 72.999,
    image: '/Nike-Dri-FIT-LeBron.webp',
    isOffer: 50
  },
  {
    prodName: 'Nike Dri-Fit UV Hyverse',
    price: 70.009,
    prevPrice: 101.399,
    image: '/NikeDri-FIT-UV-Hyverse.webp',
    isOffer: 60
  },
  {
    prodName: 'Nike Dri-Fit',
    price: 125.999,
    prevPrice: 178.599,
    image: '/NikeDri-FIT.webp',
    isOffer: 30
  }
]


export function OffersSection () {
  return(
    <HomeSection bgColor="surface" extraClassname="gap-10 lg:gap-24 overflow-hidden mb-40">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-accent">{sectionInfo.title}</h3>

      <Carousel prods={offerProds} />
      
      <Button as="primary" text={sectionInfo.btnText} />
    </HomeSection>
  )
}