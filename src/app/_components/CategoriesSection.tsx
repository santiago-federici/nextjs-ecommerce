import { Wrapper } from "@components/Wrapper";
import { wixClientServer } from "@lib/WixClientServer";
import Link from "next/link";

export async function CategoriesSection() {
  const wixClient = await wixClientServer();
  const res = await wixClient.collections.queryCollections().find();
  const categories = res.items;

  return (
    <div className="bg-black w-full h-fit">
      <Wrapper className="py-16 overflow-hidden grid gap-8">
        <h3 className="text-4xl font-semibold uppercase text-white mb-4 text-center">
          Categories
        </h3>
        <div className="bento-grid-container">
          {categories.map((category) => (
            <article
              key={category._id}
              className="overflow-hidden relative group rounded-md group border border-gray-600"
            >
              <div className="w-full h-full group-hover:scale-105 transition-all duration-300 ease-in-out opacity-75 group-hover:opacity-100">
                <Link href={`/products?category=${category.slug}`}>
                  <img
                    src={category.media?.mainMedia?.image?.url}
                    alt={category._id!}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
              <p className="px-4 py-2 text-base md:text-xl font-bold w-full absolute bottom-0 left-0 bg-white/70 backdrop-blur-sm group-hover:underline underline-offset-4 transition-all duration-300 ease-in-out">
                {category.name}
              </p>
            </article>
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
