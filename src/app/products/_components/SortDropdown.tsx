"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    name: "Newest",
    value: "desc-lastUpdated",
  },
  {
    name: "Oldest",
    value: "asc-lastUpdated",
  },
  {
    name: "Price (low to high)",
    value: "asc-price",
  },
  {
    name: "Price (high to low)",
    value: "desc-price",
  },
];

export function SortDropdown() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 bg-white text-sm font-medium uppercase pl-3 pr-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-200">
          <Sort /> Sort
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={searchParams.get("sort") || "desc-lastUpdated"}
          >
            {sortOptions.map((option, index) => (
              <DropdownMenuRadioItem
                key={index}
                value={option.value}
                onClick={() => handleFilterChange(option.value)}
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
