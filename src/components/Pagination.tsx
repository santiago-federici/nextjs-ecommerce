"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftPagination, ArrowNextPagination } from "./Icons";
import { Button } from "./ui/button";

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageClick = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-8 w-full justify-center">
      <Button
        variant={"outline"}
        className="flex gap-2"
        disabled={!hasPrev}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <ArrowLeftPagination />
        Prev
      </Button>
      <Button
        variant={"outline"}
        className="flex gap-2"
        disabled={!hasNext}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
        <ArrowNextPagination />
      </Button>
    </div>
  );
}
