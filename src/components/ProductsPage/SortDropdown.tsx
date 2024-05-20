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
import { Button } from "@components/ui/button";
// import { Button } from "@components/ui/button";

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
        <DropdownMenuTrigger className="flex items-center gap-2 bg-white text-sm font-medium uppercase pl-3 pr-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-200">
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
