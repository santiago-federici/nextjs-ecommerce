import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label"

export function CustomAccordion ({ filterName, filterOptions }: { filterName: string, filterOptions: any }) {
  return (
    <Accordion type="single" collapsible defaultValue="">
      <AccordionItem value="item-1">
        <AccordionTrigger><p font-semibold text-2xl>{filterName}</p></AccordionTrigger>
        <AccordionContent className="grid gap-4">
          {
            filterOptions.map((option: any, index: any) => (
              <div key={index} className="flex gap-2">
                <input type="checkbox" id={index} className="cursor-pointer" />
                <Label htmlFor={index} className='cursor-pointer'>{option.name}</Label>
              </div>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}