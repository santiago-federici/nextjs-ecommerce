import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



export function CustomAccordion ({ filterName, filterOptions }: { filterName: string, filterOptions: any }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{filterName}</AccordionTrigger>
        <AccordionContent className="grid gap-4">
          {
            filterOptions.map((option: any, index: any) => (
              <div key={index} className="flex gap-2">
                <input type="checkbox" id={index} />
                <Label htmlFor={index}>{option.name}</Label>
              </div>
            ))
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}