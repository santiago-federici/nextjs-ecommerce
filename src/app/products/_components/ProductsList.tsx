import { wixClientServer } from "@lib/WixClientServer";
import { Card } from "@components/Card";
import { products } from "@wix/stores";

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
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    // .hasSome(
    // "productType",
    // searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    // )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || LIMIT_PER_PAGE);
  // .skip(
  // searchParams?.page
  // ? parseInt(searchParams.page) * (limit || LIMIT_PER_PAGE)
  // : 0
  // );
  // .find();

  let products: products.Product[] = [];

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split("-");

    if (sortType === "asc") {
      const res = await productQuery.ascending(sortBy).find();
      products = res.items;
    }
    if (sortType === "desc") {
      const res = await productQuery.descending(sortBy).find();
      products = res.items;
    }
  } else {
    const res = await productQuery.descending("lastUpdated").find();
    products = res.items;
  }

  return (
    <div className="grid custom-grid gap-4 mb-16">
      {products.map((prod, index) => (
        <Card key={index} prod={prod} />
      ))}
    </div>
  );
}
