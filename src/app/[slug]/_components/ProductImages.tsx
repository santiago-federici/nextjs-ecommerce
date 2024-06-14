"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";

export default function ProductImages({ images }: { images: any }) {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleClickMiniImage = (index: number) => {
    setMainImage(images[index]);
  };

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      {/* Big devices images */}
      <article className="hidden lg:flex gap-4">
        <section className="flex flex-col gap-4">
          {images.map((image: any, index: number) => (
            <img
              key={index}
              src={image.thumbnail.url}
              alt={image.title}
              width={100}
              height={100}
              className={clsx(
                {
                  "border-gray-900": image.image.url === mainImage.image.url,
                },
                "object-cover border border-gray-400 rounded-sm hover:border-black cursor-pointer size-16"
              )}
              onClick={() => handleClickMiniImage(index)}
            />
          ))}
        </section>

        <div className="w-full rounded-sm overflow-hidden">
          <img
            src={mainImage.image.url}
            alt={mainImage.title}
            className="object-contain"
          />
        </div>
      </article>

      {/* Small devices images */}
      <article className="flex flex-col gap-4 lg:hidden">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((image: any, imageIndex: number) => (
              <CarouselItem
                key={imageIndex}
                className="w-full rounded-sm overflow-hidden relative"
              >
                <img
                  src={image.image.url}
                  alt={image.title}
                  className="w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center items-center gap-2">
          {images.map((image: any, index: number) => (
            <span
              key={index}
              className={clsx(
                {
                  "bg-gray-700": current === index + 1,
                },
                "size-2 rounded-full bg-gray-300"
              )}
            ></span>
          ))}
        </div>
      </article>
    </>
  );
}
