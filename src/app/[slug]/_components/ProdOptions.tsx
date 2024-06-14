"use client";

import { useEffect, useState } from "react";

import { products } from "@wix/stores";

import { QuantitySelector } from "./QuantitySelector";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";

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
    <>
      <section className="hidden xl:flex flex-col gap-6 w-full xl:border xl:rounded-md p-2 xl:px-4">
        {stock.quantity ? (
          <p className="text-sm font-medium">
            <span className="text-orange-600">{stock?.quantity} units</span>{" "}
            available
          </p>
        ) : (
          <p className="text-orange-600 font-medium">Out of stock</p>
        )}
        {productOptions.map((option) => (
          <div key={option.name}>
            <p className="font-semibold mt-4 mb-2">Choose a {option.name}</p>

            <div className="flex gap-2">
              {option.choices?.map((choice: any, index: number) => {
                const disabled = !isVariantInStock({
                  ...selectedOptions,
                  [option.name!]: choice.description,
                });

                const selected =
                  selectedOptions[option.name!] === choice.description;

                return option.name === "Size" ? (
                  <SizeSelector
                    key={index}
                    handleClickOption={handleClickOption}
                    optionName={option.name!}
                    choiceDescription={choice.description!}
                    selected={selected}
                    disabled={disabled}
                  />
                ) : (
                  <ColorSelector
                    key={index}
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

        <QuantitySelector
          productId={productId}
          variantId={
            selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={selectedVariant?.stock?.quantity || 0}
          inStock={stock?.inStock}
        />
      </section>

      <section className="xl:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant={"outline"}>Color and Size</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center">Product options</DrawerTitle>
              <DrawerDescription className="text-center">
                Choose the color and size of your product.
              </DrawerDescription>
            </DrawerHeader>
            <Separator className="my-4 w-[85%] self-center" />
            <section className="p-4 m-4">
              {stock.quantity ? (
                <p className="text-sm font-medium">
                  <span className="text-orange-600">
                    {stock?.quantity} units
                  </span>{" "}
                  available
                </p>
              ) : (
                <p className="text-orange-600 font-medium">Out of stock</p>
              )}
              {productOptions.map((option) => (
                <div key={option.name}>
                  <p className="font-semibold mt-4 mb-2">
                    Choose a {option.name}
                  </p>

                  <div className="flex gap-2">
                    {option.choices?.map((choice: any, index: number) => {
                      const disabled = !isVariantInStock({
                        ...selectedOptions,
                        [option.name!]: choice.description,
                      });

                      const selected =
                        selectedOptions[option.name!] === choice.description;

                      return option.name === "Size" ? (
                        <SizeSelector
                          key={index}
                          handleClickOption={handleClickOption}
                          optionName={option.name!}
                          choiceDescription={choice.description!}
                          selected={selected}
                          disabled={disabled}
                        />
                      ) : option.name === "Color" ? (
                        <ColorSelector
                          key={index}
                          handleClickOption={handleClickOption}
                          optionName={option.name!}
                          choiceDescription={choice.description!}
                          selected={selected}
                          disabled={disabled}
                          choiceValue={choice.value}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
              <QuantitySelector
                productId={productId}
                variantId={
                  selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
                }
                stockNumber={selectedVariant?.stock?.quantity || 0}
                inStock={stock?.inStock}
              />
            </section>
          </DrawerContent>
        </Drawer>
      </section>
    </>
  );
}
