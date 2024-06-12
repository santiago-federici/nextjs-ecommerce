import { Wrapper } from "@components/Wrapper";
import { wixClientServer } from "@lib/WixClientServer";
import Link from "next/link";

const winterCollectionInfo = {
  title: "CHECK OUT OUR OFFERS",
  subtitle: "Products up to 30% OFF",
  description:
    "We are offering a wide range of products from the best brands in the market. Our products are made with the highest quality materials and are designed to last. We are committed to providing you with the best products at the best prices.",
};

export async function OffersSection() {
  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();
  const products = res.items;

  const discountedProds = products
    .filter((prod) => prod.discount?.value && prod.discount?.value > 0)
    .slice(0, 3);

  return (
    <div className="bg-custom-secondary">
      <Wrapper className="grid lg:flex justify-between gap-6 lg:gap-10 py-24 lg:py-32">
        <div className="flow lg:max-w-sm xl:max-w-xl">
          <h3 className="text-white text-3xl">{winterCollectionInfo.title}</h3>
          <p className="text-gray-300 text-base md:text-lg">
            {winterCollectionInfo.subtitle}
          </p>
          <p className="text-gray-300 text-base md:text-lg">
            {winterCollectionInfo.description}
          </p>
        </div>

        <ul className="grid lg:flex gap-4 w-full">
          {discountedProds.map((prod, index) => (
            <li key={index} className="relative overflow-hidden group">
              <img
                src={prod.media?.mainMedia?.image?.url}
                alt={prod.name!}
                className="w-full h-[300px] mg:h-[350px] lg:h-[400px] object-cover opacity-75 cursor-pointer group-hover:opacity-85 group-hover:scale-105 transition duration-500 rounded-sm"
              />

              <Link
                href={"/products"}
                className="absolute text-white font-bold bottom-0 right-2 cursor-pointer custom-underline"
              >
                Discover
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  );
}
