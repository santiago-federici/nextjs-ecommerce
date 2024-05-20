import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@components/ui/button";

import { Filter } from "@components/Icons";

const filters = [
  {
    id: 1,
    name: "Categories",
    options: [
      {
        name: "All",
        value: "all",
      },
      {
        name: "T-Shirts",
        value: "tshirts",
      },
      {
        name: "Hoodies",
        value: "hoodies",
      },
      {
        name: "Snickers",
        value: "snickers",
      },
      {
        name: "Joggers",
        value: "joggers",
      },
    ],
  },
  {
    id: 2,
    name: "Brands",
    options: [
      {
        name: "All",
        value: "all",
      },
      {
        name: "Adidas",
        value: "adidas",
      },
      {
        name: "Puma",
        value: "puma",
      },
      {
        name: "Reebok",
        value: "reebok",
      },
      {
        name: "Vans",
        value: "vans",
      },
    ],
  },
  {
    id: 3,
    name: "Price",
    options: [
      {
        name: "Under $10",
        value: "10",
      },
      {
        name: "$10 - $20",
        value: "10-20",
      },
      {
        name: "$20 - $30",
        value: "20-30",
      },
      {
        name: "$30 - $40",
        value: "30-40",
      },
      {
        name: "Over $40",
        value: "40",
      },
    ],
  },
  {
    id: 4,
    name: "Rating",
    options: [
      {
        name: "5 Stars",
        value: "5",
      },
      {
        name: "4 Stars",
        value: "4",
      },
      {
        name: "3 Stars",
        value: "3",
      },
      {
        name: "2 Stars",
        value: "2",
      },
    ],
  },
  {
    id: 5,
    name: "Discount",
    options: [
      {
        name: "Only discount",
        value: "discount",
      },
      {
        name: "No discount",
        value: "nodiscount",
      },
    ],
  },
];

export function FiltersComponent() {
  return (
    <>
      <aside className="hidden xl:flex gap-4 lg:flex-col border border-gray-200 p-4 rounded-md shadow-md min-w-60">
        <p className="text-gray-600">Filters</p>
        <FiltersAccordion />
        <FiltersButtons />
      </aside>

      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center gap-2 text-sm font-medium uppercase pl-3 pr-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-200">
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
                    type="checkbox"
                    id={index}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={index} className="cursor-pointer">
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
