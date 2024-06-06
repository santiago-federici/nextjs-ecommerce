import { Wrapper } from "@components/Wrapper";
import { wixClientServer } from "@lib/WixClientServer";
import Link from "next/link";

export async function CategoriesSection() {
  const wixClient = await wixClientServer();
  const res = await wixClient.collections.queryCollections().find();
  const categories = res.items;

  return (
    <>
      <div className="h-10 w-full bg-black"></div>
      <Wrapper className="grid gap-12 py-16">
        <h3 className="text-5xl uppercase text-center font-bold underline underline-offset-8">
          Categories
        </h3>
        <div className="grid lg:flex gap-6">
          {categories.map((category) => (
            <article key={category._id} className="overflow-hidden">
              <div className="w-64 h-64">
                <Link href={`/products?category=${category.slug}`}>
                  <img
                    src={category.media?.mainMedia?.image?.url}
                    alt={category._id!}
                    className="w-full h-full object-cover rounded-md"
                  />
                </Link>
              </div>
              <p className="text-lg font-medium mt-4">{category.name}</p>
            </article>
          ))}
        </div>
      </Wrapper>
    </>
  );
}
