import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card } from "@components/Card";

import { db } from "@db";
import { eq } from "drizzle-orm";
import { productCategories } from "@db/schemas/productsCategories";
import { products } from "@db/schemas/products";

export default async function RelatedProductsSection({
  productCategory,
  prodId,
}: {
  productCategory: any;
  prodId: number;
}) {
  const relatedProdsIds = [];
  for (const item of productCategory) {
    const relatedProdId = await db
      .select({ productId: productCategories.productId })
      .from(productCategories)
      .where(eq(productCategories.categoryId, item.categoryId));
    relatedProdsIds.push(relatedProdId);
  }

  const relatedProds = [];
  for (const item of relatedProdsIds) {
    for (const prodId of item) {
      const relatedProd = await db
        .select()
        .from(products)
        .where(eq(products.id, prodId.productId));
      relatedProds.push(relatedProd[0]);
    }
  }

  const finalRelatedProds = relatedProds.filter((prod) => prod.id !== prodId);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="flex items-stretch">
        {finalRelatedProds.map((prod, index) => (
          <CarouselItem
            key={index}
            className="basis-[40%] md:basis-[30%] lg:basis-[29%] xl:basis-[25%]"
          >
            <Card prod={prod} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="ml-12 -mt-8 lg:m-0" /> */}
      <CarouselPrevious />
      {/* <CarouselNext className="mr-12 -mt-8 lg:m-0" /> */}
      <CarouselNext />
    </Carousel>
  );
}
