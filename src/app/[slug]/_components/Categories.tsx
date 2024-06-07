import Link from "next/link";

import { wixClientServer } from "@lib/WixClientServer";

export default async function Categories({
  categoriesIds,
}: {
  categoriesIds: any;
}) {
  const wixClient = await wixClientServer();

  let categories: any[] = [];

  for (const id of categoriesIds) {
    const category = await wixClient.collections
      .queryCollections()
      .eq("_id", id)
      .find();
    categories.push(category);
  }

  return (
    categories.length > 1 && (
      <div className="flex items-center">
        <p className="font-medium mr-2">Categories: </p>
        {categories.map(
          (category: any) =>
            category.items[0].name !== "All Products" && (
              <Link
                key={category.items[0]._id}
                href={`/products?category=${category.items[0].slug}`}
                className="text-sm font-light cursor-pointer hover:text-blue-600 mr-1"
              >
                {category.items[0].name},
              </Link>
            )
        )}
      </div>
    )
  );
}
