import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "./Card"


export function CarouselContainer ({ prods }: { prods: any[] }) {
  return(
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="overflow-hidden w-full carousel-mask-image"
      >
      <CarouselContent className="w-full gap-4">
        {
          prods.map((prod, index) => (
            <CarouselItem key={index} className="w-full basis-full md:basis-1/2 lg:basis-1/3">
              <Card
                prodName={prod.prodName}
                price={prod.price}
                prevPrice={prod.prevPrice}
                image={prod.image}
                isOffer={prod.isOffer}
              />
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className="ml-24 md:top-[45%]" />
      <CarouselNext className="mr-24 md:top-[45%]" />
    </Carousel>
  )
}
