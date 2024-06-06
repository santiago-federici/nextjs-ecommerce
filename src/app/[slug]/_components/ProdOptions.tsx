"use client";

import { useEffect, useState } from "react";

import { products } from "@wix/stores";

import { QuantitySelector } from "./QuantitySelector";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";

export default function ProdOptions({
  productId,
  variants,
  productOptions,
  stock,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
  stock: any;
}) {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

  useEffect(() => {
    const variant = variants.find((variant) => {
      const variantChoices = variant.choices;

      if (!variantChoices) return false;

      return Object.entries(selectedOptions).every(
        ([key, value]) => variantChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

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
    <section className="flex flex-col gap-6 w-full xl:border xl:rounded-md p-2 xl:px-4">
      <p className="text-sm font-medium">
        <span className="text-orange-600">{stock?.quantity} units</span>{" "}
        available
      </p>
      {productOptions.map((option) => (
        <div key={option.name}>
          <p className="font-semibold mt-4 mb-2">Choose a {option.name}</p>

          <div className="flex gap-2">
            {option.choices?.map((choice: any) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.description,
              });

              const selected =
                selectedOptions[option.name!] === choice.description;

              return option.name === "Size" ? (
                <SizeSelector
                  key={choice.value}
                  handleClickOption={handleClickOption}
                  optionName={option.name!}
                  choiceDescription={choice.description!}
                  selected={selected}
                  disabled={disabled}
                />
              ) : (
                <ColorSelector
                  key={choice.value}
                  handleClickOption={handleClickOption}
                  optionName={option.name!}
                  choiceDescription={choice.description!}
                  selected={selected}
                  disabled={disabled}
                  choiceValue={choice.value}
                />
              );
            })}
          </div>
        </div>
      ))}

      {stock?.inStock === true && selectedVariant?.stock?.quantity! > 0 && (
        <QuantitySelector
          productId={productId}
          variantId={
            selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={selectedVariant?.stock?.quantity || 0}
        />
      )}
    </section>
  );
}
