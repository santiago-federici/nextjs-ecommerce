import Link from "next/link";

import { db } from "@db";
import { products } from "@db/schemas/products";

import { Wrapper } from "@components/Wrapper";
import { Card } from "@components/Card";
import { Button } from "@components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import clsx from "clsx";

const sectionInfo = {
  title: "Best offers",
  btn: {
    text: "See offers",
    href: "/products",
  },
};

export async function OffersSection() {
  const prods = await db.select().from(products);

  const discountedProds = prods.filter((prod) => prod.offerPercentage > 0);

  const highestDiscounts = discountedProds.sort(
    (a, b) => (b.offerPercentage || 0) - (a.offerPercentage || 0)
  );

  return (
    <Wrapper className="grid place-items-center gap-12 lg:gap-16 py-24 lg:py-32">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-custom-accent">
        {sectionInfo.title}
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-xs md:max-w-lg lg:max-w-full lg:w-9/12"
      >
        <CarouselContent className="flex items-stretch">
          {highestDiscounts.map((prod, index) => (
            <CarouselItem
              key={index}
              // this is taking care of the case when there are less than 4 products, so it doesn't look bad
              className={clsx({
                "": highestDiscounts.length === 1,
                "md:basis-1/2": highestDiscounts.length === 2,
                "md:basis-1/2 lg:basis-1/3": highestDiscounts.length === 3,
                "md:basis-1/2 lg:basis-1/4": highestDiscounts.length > 3,
              })}
            >
              <Card prod={prod} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-4" />
        <CarouselNext className="mr-4" />
      </Carousel>

      <Link href={sectionInfo.btn.href}>
        <Button className="uppercase">{sectionInfo.btn.text}</Button>
      </Link>
    </Wrapper>
  );
}
