import { Card } from "@components/Card";
import { Button } from "@components/CustomButtons";
import prods from '@mocks/prods.json'
import { Wrapper } from "@components/Wrapper";
import Link from "next/link";

const sectionInfo ={
  title: 'Best offers',
  btn: {
    text: 'See offers',
    href: '/products'
  }
}

export function OffersSection () {
  const discountedProds = prods.filter(prod => prod.isOffer);

  const highestDiscounts = discountedProds.sort((a, b) => (b.isOffer || 0) - (a.isOffer || 0));

  const limitedProds = highestDiscounts.slice(0, 3);
  
  return(
    <Wrapper className="grid place-items-center gap-12 lg:gap-16">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-accent">{sectionInfo.title}</h3>

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
      
      <Link href={sectionInfo.btn.href}>
        <Button as="primary" text={sectionInfo.btn.text} />
      </Link>
    </Wrapper>
  )
}