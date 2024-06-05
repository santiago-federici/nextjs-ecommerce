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

interface ProdProps {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  offerPercentage: number;
  stock: number;
  createdAt: string;
}

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

  const relatedProds: ProdProps[] = [];
  for (const item of relatedProdsIds) {
    for (const prodId of item) {
      const relatedProd = await db
        .select()
        .from(products)
        .where(eq(products.id, prodId.productId));
      relatedProds.push(relatedProd[0]);
    }
  }

  const finalRelatedProds: ProdProps[] = relatedProds.filter(
    (prod) => prod.id !== prodId
  );

  const uniqueProducts: ProdProps[] = Object.values(
    finalRelatedProds.reduce((acc: any, product: ProdProps) => {
      acc[product.id] = product;
      return acc;
    }, {})
  );

  return (
    <>
      <h3 className="mb-4">Related products</h3>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {uniqueProducts.map((prod: ProdProps, index) => (
            <CarouselItem key={index} className="custom-basis">
              <Card prod={prod} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 top-1/2 -translate-y-12 lg:m-0 lg:realtive" />
        <CarouselNext className="mr-12 top-1/2 -translate-y-12 lg:m-0 lg:realtive" />
      </Carousel>
    </>
  );
}
