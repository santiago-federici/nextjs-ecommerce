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
  const productQuery = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || LIMIT_PER_PAGE);

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending("price");
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();
  const products = res.items;

  return (
    <div className="grid custom-grid gap-4 mb-16">
      {products.map((prod, index) => (
        <Card key={index} prod={prod} />
      ))}
    </div>
  );
}
