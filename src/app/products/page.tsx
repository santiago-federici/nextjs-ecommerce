import Link from "next/link";

import { Suspense } from "react";

import { Wrapper } from "@components/Wrapper";
import { SortDropdown } from "./_components/SortDropdown";
import { FiltersComponent } from "./_components/FiltersComponent";
import { Card } from "@components/Card";

import { ArrowRight } from "@components/Icons";

import { Toaster } from "sonner";

import clsx from "clsx";

import { wixClientServer } from "@lib/WixClientServer";

import "@styles/ProductsPage.css";
import { products } from "@wix/stores";

const skewedSection = [
  {
    text: "New costumer?",
    bg: "bg-gray-300",
  },
  {
    text: "10% OFF",
    bg: "bg-gray-400",
  },
  {
    text: "In your first order!",
    bg: "bg-gray-500",
  },
];

export default async function ProductsPage() {
  // const prods = await db.select().from(products);

  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();

  const products = res.items;

  return (
    <Wrapper className="flex flex-col">
      {/* TODO: create breadcrumbs component with all the logic */}
      <div className="text-gray-500 text-sm mb-10 flex gap-1">
        <Link href={"/"}>Homepage</Link>
        <ArrowRight />
        <p>Products</p>
      </div>

      <section className="grid gap-8 lg:flex lg:justify-between w-full">
        <div className="flex flex-col justify-between">
          <h2 className="text-6xl font-semibold">Shirts</h2>
          {/* <p className="text-gray-500 text-sm">{prods.length} results</p> */}
        </div>

        {/* Custom banner */}
        <div className="lg:mr-4 skew-x-[-20deg] place-self-center flex w-full lg:w-[60%] h-16 md:h-24">
          {skewedSection.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} w-[33%] h-full grid place-items-center px-4`}
            >
              <p
                className={clsx(
                  "font-bold uppercase text-center skew-x-[20deg]",
                  {
                    "text-base md:text-xl lg:text-2xl xl:text-4xl": index === 1,
                  },
                  {
                    "text-xs md:text-lg lg:text-xl xl:text-2xl": index != 1,
                  }
                )}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SortDropdown className="hidden xl:flex self-end mt-8" />

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_4fr] gap-4 mt-10">
        <section className="mb-6 max-xl:flex justify-between xl:justify-start relative">
          <SortDropdown className="xl:hidden" />

          <FiltersComponent />
        </section>
        <Suspense fallback={"loading..."}>
          <div className="grid custom-grid gap-4 mb-16">
            {products.map((prod: products.Product, index) => (
              <Card key={index} prod={prod} />
            ))}
          </div>
        </Suspense>
      </section>
      <Toaster richColors />
    </Wrapper>
  );
}
