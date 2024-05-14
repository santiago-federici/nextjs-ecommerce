import Image from "next/image";
import Link from "next/link";

import { Wrapper } from "@components/Wrapper";
import { SortDropdown } from "@components/ProductsPage/SortDropdown";
import { FiltersComponent } from "@components/ProductsPage/FiltersComponent";
import { Card } from "@components/Card";

import { ArrowRight } from "@components/Icons";

import { Toaster } from "sonner";

import { db } from "@db";
import { products } from "@db/schemas/products";

import "@styles/ProductsPage.css";

export default async function ProductsPage() {
  const prods = await db.select().from(products);

  return (
    <Wrapper className="flex flex-col">
      {/* TODO: create breadcrumbs component with all the logic */}
      <div className="text-gray-500 text-sm mb-10 flex gap-1">
        <Link href={"/"}>Homepage</Link>
        <ArrowRight />
        <p>Products</p>
      </div>

      <section className="grid lg:flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <h2 className="text-6xl">Shirts</h2>
          <p className="text-text text-sm">{prods.length} results</p>
        </div>

        <Image
          src={"/prodsHeader.png"}
          width={900}
          height={150}
          alt={"prodsHeader"}
          className="w-full lg:w-2/3"
        />
      </section>

      <SortDropdown className="hidden xl:flex self-end mt-8" />

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_4fr] gap-4 mt-10">
        <section className="mb-6 max-xl:flex justify-between xl:justify-start relative">
          <SortDropdown className="xl:hidden" />

          <FiltersComponent />
        </section>

        <div className="grid custom-grid gap-4 mb-16">
          {prods.map((prod, index) => (
            <Card key={index} prod={prod} />
          ))}
        </div>
      </section>
      <Toaster richColors closeButton />
    </Wrapper>
  );
}
