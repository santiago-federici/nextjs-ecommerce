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

import { Filter } from "@components/Icons";

const categoryOptions = [
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
];

export function CategoryDropdown() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 bg-white text-sm font-medium uppercase pl-3 pr-4 py-2 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-200">
          <Filter /> Filter
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={searchParams.get("category") || "all-products"}
          >
            {categoryOptions.map((option, index) => (
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
