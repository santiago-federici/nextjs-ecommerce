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

export function FiltersSheet ({ filters }: { filters: any }) {
  return (
    <Sheet>
      <SheetTrigger  className="font-medium uppercase text-sm md:text-md px-4 py-2 rounded-md relative transition duration-200 flex gap-2 bg-zinc-300 border border-zinc-900 hover:opacity-70">
        <Filter /> Filters
      </SheetTrigger>

      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle className='self-start'>Filters</SheetTitle>
        </SheetHeader>

        <section className="mt-8">
          {
            filters.map((filter: any, index: number) => (
              <CustomAccordion 
                key={index} 
                filterName={filter.name} 
                filterOptions={filter.options} 
              />
            ))
          }
        </section>
        <SheetFooter className="mt-8 grid">
          <div className="flex gap-4 items-center">
            <Button as="filled" text="Clear" className="bg-red-600 border-red-600 text-red-100 w-full" />
            <Button as="filled" text="Apply" className="w-full" />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}