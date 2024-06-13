import { wixClientServer } from "@lib/WixClientServer";
import { Card } from "@components/Card";
import Pagination from "@components/Pagination";

const LIMIT_PER_PAGE = 20;
export async function ProductsList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: {
    category?: string;
    sort?: any;
    name?: string;
    min?: number;
    max?: number;
    page?: string;
  };
}) {
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || LIMIT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || LIMIT_PER_PAGE)
        : 0
    );

  let res;

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split("-");

    if (sortType === "asc") {
      res = await productQuery.ascending(sortBy).find();
    }
    if (sortType === "desc") {
      res = await productQuery.descending(sortBy).find();
    }
  } else {
    res = await productQuery.descending("lastUpdated").find();
  }

  const products = res?.items;

  return (
    <>
      <div className="grid custom-grid gap-4 mb-16">
        {products &&
          products.map((prod, index) => <Card key={index} prod={prod} />)}
      </div>

      <Pagination
        currentPage={res?.currentPage || 0}
        hasPrev={res?.hasPrev()!}
        hasNext={res?.hasNext()!}
      />
    </>
  );
}
