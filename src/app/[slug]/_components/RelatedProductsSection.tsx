import { wixClientServer } from "@lib/WixClientServer";

import { Card } from "@components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default async function RelatedProductsSection({
  categoriesIds,
  productId,
}: {
  categoriesIds: any;
  productId: string;
}) {
  const wixClient = await wixClientServer();

  const prodCategories = categoriesIds.filter(
    (id: string) => id !== "00000000-000000-000000-000000000001"
  );

  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", prodCategories)
    .find();
  const products = res.items;

  const relatedProducts = products.filter((prod) => prod._id !== productId);

  return (
    <section>
      <h3 className="mb-4">Related products</h3>

      <Carousel>
        <CarouselContent>
          {relatedProducts.map((prod) => (
            <CarouselItem key={prod._id}>
              <Card prod={prod} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
