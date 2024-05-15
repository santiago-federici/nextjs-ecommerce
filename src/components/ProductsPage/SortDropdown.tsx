"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sort } from "@components/Icons";

const sortOptions = [
  {
    name: "Most relevant",
    value: "most-relevant",
  },
  {
    name: "Most recent",
    value: "most-recent",
  },
  {
    name: "Highest price",
    value: "highest-price",
  },
  {
    name: "Lowest price",
    value: "lowest-price",
  },
];

export function SortDropdown({ className }: { className: string }) {
  const [value, setValue] = useState("latest");

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger className="font-medium uppercase text-sm md:text-md px-4 py-2 rounded-md relative transition duration-200 flex gap-2 bg-zinc-300 border border-zinc-900 hover:opacity-70">
          <Sort /> Sort
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 lg:ml-0">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value}>
            {sortOptions.map((option, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={option.value}
                onClick={() => setValue(option.value)}
              >
                {option.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
