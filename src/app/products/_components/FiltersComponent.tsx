"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@components/ui/button";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Filter } from "@components/Icons";

const filters = [
  {
    id: 1,
    name: "Category",
    value: "category",
    options: [
      {
        name: "All products",
        value: "all-products",
      },
      {
        name: "Shirts",
        value: "shirts",
      },
      {
        name: "Hoodies",
        value: "hoodies",
      },
      {
        name: "Shoes",
        value: "shoes",
      },
      {
        name: "Joggers",
        value: "joggers",
      },
    ],
  },
  {
    id: 2,
    name: "Brand",
    value: "brand",
    options: [
      {
        name: "Adidas",
        value: "adidas",
      },
      {
        name: "Nike",
        value: "nike",
      },
      {
        name: "Puma",
        value: "puma",
      },
    ],
  },
];

export function FiltersComponent() {
  return (
    <>
      <aside className="hidden xl:flex gap-4 lg:flex-col bg-white border border-gray-200 p-4 rounded-md shadow-md min-w-60">
        <p className="text-gray-600">Filters</p>
        <FiltersAccordion />
        <FiltersButtons />
      </aside>

      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 bg-white text-sm font-medium uppercase pl-3 pr-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-200">
            <Filter /> Filters
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <SheetHeader>
              <SheetTitle className="self-start">Filters</SheetTitle>
            </SheetHeader>

            <FiltersAccordion />

            <SheetFooter className="mt-8">
              <FiltersButtons />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/label";

function FiltersAccordion() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <section className="mt-8 lg:mt-0">
      <Accordion type="single" collapsible defaultValue="item-0">
        {filters.map((filter: any, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <p className="text-2xl">{filter.name}</p>
            </AccordionTrigger>
            <AccordionContent className="grid gap-4">
              {filter.options.map((option: any, index: any) => (
                <div key={index} className="flex gap-2">
                  <input
                    id={`filter-${index}`}
                    type="radio"
                    value={option.value}
                    checked={searchParams.get("category") === option.value}
                    className="cursor-pointer"
                    onChange={() =>
                      handleFilterChange(filter.value, option.value)
                    }
                  />
                  <Label htmlFor={`filter-${index}`} className="cursor-pointer">
                    {option.name}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function FiltersButtons() {
  return (
    <div className="flex gap-4 items-center w-full">
      <Button variant={"destructive"} className="w-full">
        Clear
      </Button>
      <Button className="w-full">Apply</Button>
    </div>
  );
}
