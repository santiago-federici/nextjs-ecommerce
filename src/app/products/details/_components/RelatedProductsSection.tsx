import { db } from "@db";
import { eq } from "drizzle-orm";
import { productCategories } from "@db/schemas/productsCategories";
import { products } from "@db/schemas/products";
import { Card } from "@components/Card";

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
    <section className="grid gap-4 mt-4 w-full">
      <h3 className="text-2xl">Related Products</h3>

      <article className="flex gap-4">
        {finalRelatedProds.map((prod, index) => (
          <Card key={index} prod={prod} />
        ))}
      </article>
    </section>
  );
}
