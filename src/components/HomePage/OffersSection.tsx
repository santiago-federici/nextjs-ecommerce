import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { Card } from "@components/Card";
import { Button } from "@components/CustomButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import prods from '@mocks/prods.json'

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

  return(
    <Wrapper className="grid place-items-center gap-12 lg:gap-16 py-24 lg:py-32">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-custom-accent">{sectionInfo.title}</h3>

      <Carousel 
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-xs md:max-w-lg lg:max-w-4xl xl:max-w-6xl"
      >
      <CarouselContent className="flex items-stretch">
        {
          highestDiscounts.map((prod, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 last:custom-mask">
              <Card id={prod.id} />
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className='ml-4' />
      <CarouselNext className='mr-4' />
    </Carousel>
      
      <Link href={sectionInfo.btn.href}>
        <Button as="filled" text={sectionInfo.btn.text} />
      </Link>
    </Wrapper>
  )
}