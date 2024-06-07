import Link from "next/link";

import { Suspense } from "react";

import { wixClientServer } from "@lib/WixClientServer";

import { Wrapper } from "@components/Wrapper";
import { CategoryDropdown } from "./_components/CategoryDropdown";
import { SortDropdown } from "./_components/SortDropdown";
import { ProductsList } from "./_components/ProductsList";

import { ArrowRight } from "@components/Icons";

import { Toaster } from "sonner";

import clsx from "clsx";

import "@styles/ProductsPage.css";
import { SearchInput } from "./_components/SearchInput";
import { Separator } from "@components/ui/separator";

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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const wixClient = await wixClientServer();

  const category = await wixClient.collections.getCollectionBySlug(
    searchParams.category || "all-products"
  );

  return (
    <Wrapper className="flex flex-col">
      {/* TODO: create breadcrumbs component with all the logic */}
      <div className="text-gray-500 text-sm mb-10 flex gap-1">
        <Link href={"/"}>Homepage</Link>
        <ArrowRight />
        <p>Products</p>
      </div>

      <div className="w-full h-44 md:h-60 mb-10 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="products banner"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col gap-8 relative">
        <h2 className="text-6xl font-semibold">
          {category.collection?.name || "All Products"}
        </h2>
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-between">
          <div className="flex gap-2">
            <CategoryDropdown />
            <SortDropdown />
          </div>
          <SearchInput />
        </div>
      </div>

      <Separator className="w-full my-8" />

      <Suspense fallback={"loading..."}>
        <ProductsList
          categoryId={
            category.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
      <Toaster richColors />
    </Wrapper>
  );
}
