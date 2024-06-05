"use client";

import clsx from "clsx";
import { useState } from "react";

export default function ProductImages({ images }: { images: any }) {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleClickMiniImage = (index: number) => {
    setMainImage(images[index]);
  };

  return (
    <>
      <section className="hidden lg:flex md:flex-col gap-4">
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
              "object-cover border border-gray-400 rounded-sm hover:border-black cursor-pointer"
            )}
            onClick={() => handleClickMiniImage(index)}
          />
        ))}
      </section>

      <div className="w-full lg:max-w-[40%] bg-[#f0f0f0] grid place-items-center rounded-sm overflow-hidden">
        <img
          src={mainImage.image.url}
          alt={mainImage.title}
          width={600}
          height={600}
          className="sm:max-lg:w-full md:max-h-[600px] object-contain"
        />
      </div>
    </>
  );
}
