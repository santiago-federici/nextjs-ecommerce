"use client";

import { useState } from "react";

import { products } from "@wix/stores";

export default function ProdOptions({
  variants,
  productOptions,
}: {
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleClickOption = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;

      if (!variantChoices) return false;

      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <section>
      {productOptions.map((option) => (
        <>
          <p className="font-semibold mt-4 mb-2" key={option.name}>
            Choose a {option.name}
          </p>

          <div className="flex gap-3">
            {option.choices?.map((choice: any) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              return option.name === "Size" ? (
                <div
                  key={choice.value}
                  onClick={() =>
                    handleClickOption(option.name!, choice.description!)
                  }
                  className={`w-7 h-7 text-xs font-semibold uppercase flex items-center justify-center rounded-md border transition duration-100 ${
                    selected ? "border-gray-900 bg-gray-900 text-white" : ""
                  } ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  {choice.description}
                </div>
              ) : (
                <div
                  key={choice.value}
                  onClick={() =>
                    handleClickOption(option.name!, choice.description!)
                  }
                  className={`w-7 h-7 rounded-full p-[2px] ${
                    selected ? "ring-1 ring-gray-900" : "ring-gray-300"
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full ${
                      disabled
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer"
                    }`}
                    style={{ backgroundColor: choice.value }}
                  ></div>
                </div>
              );
            })}
          </div>
        </>
      ))}
    </section>
  );
}
