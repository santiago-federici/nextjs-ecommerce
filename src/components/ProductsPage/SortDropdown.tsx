'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sort } from "@components/Icons"
import { useState } from "react"


const sortOptions = [
  {
    name: "Price: Low to High",
    value: "price-asc"
  },
  {
    name: "Price: High to Low",
    value: "price-desc"
  },
  {
    name: "Name: A to Z",
    value: "name-asc"
  },
  {
    name: "Name: Z to A",
    value: "name-desc"
  },
  {
    name: "Rating: High to Low",
    value: "rating-desc"
  },
  {
    name: "Rating: Low to High",
    value: "rating-asc"
  },
  {
    name: "Discount: High to Low",
    value: "discount-desc"
  },
  {
    name: "Discount: Low to High",
    value: "discount-asc"
  },
  {
    name: "Popularity",
    value: "popularity"
  },
  {
    name: "Latest",
    value: "latest"
  },
]

export function SortDropdown ({ className }: { className: string }) {
  const [value, setValue] = useState('latest')
  
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger  className="font-medium uppercase text-sm md:text-md px-4 py-2 rounded-md relative transition duration-200 flex gap-2 bg-zinc-300 border border-zinc-900 hover:opacity-70">
          <Sort /> Sort
        </DropdownMenuTrigger>
        <DropdownMenuContent className='ml-4 lg:ml-0'>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value}>
            {
              sortOptions.map((option, index) => (
                <DropdownMenuRadioItem 
                  key={index}
                  value={option.value}
                  onClick={() => setValue(option.value)}
                >
                  {option.name}
                </DropdownMenuRadioItem>  
              ))
            }
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}