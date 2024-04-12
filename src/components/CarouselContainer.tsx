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
        className="overflow-hidden w-full"
      >
        <CarouselContent className="w-full gap-4">
          {
            prods.map((prod, index) => (
              <CarouselItem key={index} className="w-full basis-full lg:basis-1/3">
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
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>
  )
}
