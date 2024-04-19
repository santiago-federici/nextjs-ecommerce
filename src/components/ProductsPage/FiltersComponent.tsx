import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@components/CustomButton"
import { Filter } from "@components/Icons"
import { CustomAccordion } from "./CustomAccordion"

const filters = [
  {
    id: 1,
    name: "Categories",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "T-Shirts",
        value: "tshirts"
      },
      {
        name: "Hoodies",
        value: "hoodies"
      },
      {
        name: "Snickers",
        value: "snickers"
      },
      {
        name: "Joggers",
        value: "joggers"
      }
    ]
  },
  {
    id: 2,
    name: "Brands",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Adidas",
        value: "adidas"
      },
      {
        name: "Puma",
        value: "puma"
      },
      {
        name: "Reebok",
        value: "reebok"
      },
      {
        name: "Vans",
        value: "vans"
      }
    ]
  },
  {
    id: 3,
    name: "Price",
    options: [
      {
        name: "Under $10",
        value: "10"
      },
      {
        name: "$10 - $20",
        value: "10-20"
      },
      {
        name: "$20 - $30",
        value: "20-30"
      },
      {
        name: "$30 - $40",
        value: "30-40"
      },
      {
        name: "Over $40",
        value: "40"
      }
    ]
  },
  {
    id: 4,
    name: "Rating",
    options: [
      {
        name: "5 Stars",
        value: "5"
      },
      {
        name: "4 Stars",
        value: "4"
      },
      {
        name: "3 Stars",
        value: "3"
      },
      {
        name: "2 Stars",
        value: "2"
      },
    ]
  },
  {
    id: 5,
    name: "Discount",
    options: [
      {
        name: "Only discount",
        value: "discount"
      },
      {
        name: "No discount",
        value: "nodiscount"
      }
    ]
  }
]

export function FiltersComponent () {
  return (
    <>
      <aside className="hidden lg:flex gap-4 lg:flex-col bg-white p-4 rounded-md shadow-md">
        <p className='text-gray-600'>Filters</p>
        <FiltersAcoordion />
        <FiltersButtons />
      </aside>

      <div className='lg:hidden'>
        <Sheet>
          <SheetTrigger  className="font-medium uppercase text-sm md:text-md px-4 py-2 rounded-md relative transition duration-200 flex gap-2 bg-zinc-300 border border-zinc-900 hover:opacity-70">
            <Filter /> Filters
          </SheetTrigger>

          <SheetContent className='flex flex-col'>
            <SheetHeader>
              <SheetTitle className='self-start'>Filters</SheetTitle>
            </SheetHeader>

            <FiltersAcoordion />
            
            <SheetFooter className="mt-8 grid">
              <FiltersButtons />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label"

function FiltersAcoordion () {
  return(
    <section className="mt-8 lg:mt-0">
      <Accordion type="single" collapsible defaultValue="item-0">
        {
          filters.map((filter: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger><p className='text-2xl'>{filter.name}</p></AccordionTrigger>
              <AccordionContent className="grid gap-4">
                {
                  filter.options.map((option: any, index: any) => (
                    <div key={index} className="flex gap-2">
                      <input type="checkbox" id={index} className="cursor-pointer" />
                      <Label htmlFor={index} className='cursor-pointer'>{option.name}</Label>
                    </div>
                  ))
                }
              </AccordionContent>
            </AccordionItem>
          ))
        }
      </Accordion>
    </section>
  )
}

function FiltersButtons (){
  return(
    <div className="flex gap-4 items-center">
      <Button as="filled" text="Clear" className="bg-red-600 border-red-600 text-red-100 w-full" />
      <Button as="filled" text="Apply" className="w-full" />
    </div>
  )
}