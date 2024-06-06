import Link from "next/link";

import { wixClientServer } from "@lib/WixClientServer";

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
  const wixClient = await wixClientServer();
  const res = await wixClient.products.queryProducts().find();
  const products = res.items;

  const discountedProds = products.filter(
    (prod) => prod.discount?.value && prod.discount?.value > 0
  );

  return (
    <Wrapper className="w-full py-24 lg:py-32">
      <h3 className="text-5xl font-bold uppercase text-center mb-8 underline underline-offset-8">
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
          {discountedProds.map((prod, index) => (
            <CarouselItem
              key={index}
              // this is taking care of the case when there are less than 4 products, so it doesn't look bad
              className={clsx({
                "mx-auto md:max-w-[80%] custom-offers-basis":
                  discountedProds.length <= 3,
                "custom-basis": discountedProds.length > 3,
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
