import { wixClientServer } from "@lib/WixClientServer";
import { Card } from "@components/Card";

const LIMIT_PER_PAGE = 20;
export async function ProductsList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || LIMIT_PER_PAGE)
    .find();
  const products = res.items;

  return (
    <div className="grid custom-grid gap-4 mb-16">
      {products.map((prod, index) => (
        <Card key={index} prod={prod} />
      ))}
    </div>
  );
}
