import { db } from "@db";
import { categories } from "@db/schemas/categories";
import { productCategories } from "@db/schemas/productsCategories";
import { eq } from "drizzle-orm";

export default async function Categories({ prodId }: { prodId: number }) {
  // Getting the category (or categories) related to the product. This is used to get the categories NAMES.
  const productCategory = await db
    .select({ categoryId: productCategories.categoryId })
    .from(productCategories)
    .where(eq(productCategories.productId, prodId));

  // Getting the NAME of the category (or categories) related to the product
  const categoryNames = [];
  for (const item of productCategory) {
    const categoryName = await db
      .select({ name: categories.name })
      .from(categories)
      .where(eq(categories.id, item.categoryId));
    categoryNames.push(categoryName[0].name);
  }

  return (
    categoryNames && (
      <p className="font-semibold">
        Categories:{" "}
        <span className="font-light text-gray-600 text-sm">
          {categoryNames.join(", ")}
        </span>
      </p>
    )
  );
}
