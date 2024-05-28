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
    <Wrapper className="w-full py-24 lg:py-32">
      <h3 className="text-4xl lg:text-5xl uppercase offers-custom-underline hover:text-custom-accent text-center w-fit mx-auto mb-8">
        {sectionInfo.title}
      </h3>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="mx-auto md:max-w-[90%] lg:max-w-[70%]"
      >
        <CarouselContent>
          {highestDiscounts.map((prod, index) => (
            <CarouselItem
              key={index}
              // this is taking care of the case when there are less than 4 products, so it doesn't look bad
              className={clsx({
                "mx-auto md:max-w-[80%] custom-offers-basis":
                  highestDiscounts.length <= 3,
                "custom-basis": highestDiscounts.length > 3,
              })}
            >
              <Card prod={prod} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 top-1/2 -translate-y-12 lg:m-0 lg:realtive" />
        <CarouselNext className="mr-12 top-1/2 -translate-y-12 lg:m-0 lg:realtive" />
      </Carousel>

      <Link href={sectionInfo.btn.href} className="flex justify-center">
        <Button className="uppercase mt-8">{sectionInfo.btn.text}</Button>
      </Link>
    </Wrapper>
  );
}
