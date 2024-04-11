import { Card } from "@components/Card";
import { HomeSection } from "./HomeSection";
import { Button } from "@components/Button";

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
    <HomeSection bgColor="primary">
      <h3 className="text-4xl uppercase offers-custom-underline">{sectionInfo.title}</h3>

      {
        offerProds.map((prod, index) => (
          <Card 
            key={index}
            prodName={prod.prodName} 
            price={prod.price} 
            prevPrice={prod.prevPrice}
            image={prod.image} 
            isOffer={prod.isOffer}
          />
        ))
      }

      <Button as="primary" text={sectionInfo.btnText} />
    </HomeSection>
  )
}