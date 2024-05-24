"use client";

import { useState } from "react";

import clsx from "clsx";

interface CategoryOptionsProps {
  id: number;
  option: string;
  productId: number;
}

export default function ProdOptions({
  categoryOptions,
}: {
  categoryOptions: CategoryOptionsProps[];
}) {
  const [selectedOption, setSelectedOption] = useState<Number>();

  return (
    <>
      <p className="font-semibold mt-4">Choose size:</p>

      <div className="flex gap-2 mb-4">
        {categoryOptions.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedOption(size.id)}
            className={clsx(
              {
                "border-black bg-black text-white font-semibold":
                  size.id === selectedOption,
              },
              "w-7 h-7 text-xs uppercase grid place-items-center rounded-md border border-gray-200 transition duration-200"
            )}
          >
            {size.option}
          </button>
        ))}
      </div>
    </>
  );
}
