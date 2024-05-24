"use client";

import Image from "next/image";

import { useState } from "react";

import JordanJumpan from "../../../../../public/JordanJumpman.webp";
import NikeSB from "../../../../../public/NikeSB.webp";
import NikeDriFIT from "../../../../../public/NikeDri-FIT.webp";
import clsx from "clsx";

export default function ProductImages({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  // instead of receiving one image, should receive all the images and then split them here

  const images = [
    {
      imageUrl: imageUrl,
      name: name,
    },
    {
      imageUrl: JordanJumpan,
      name: "Jordan Jumpman",
    },
    {
      imageUrl: NikeSB,
      name: "NikeSB",
    },
    {
      imageUrl: NikeDriFIT,
      name: "NikeDri-FIT",
    },
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  const handleClickMiniImage = (index: number) => {
    setMainImage(images[index]);
  };

  return (
    <>
      <section className="hidden lg:flex md:flex-col gap-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.imageUrl}
            alt={image.name}
            width={100}
            height={100}
            className={clsx(
              {
                "border-gray-900": image.imageUrl === mainImage.imageUrl,
              },
              "object-cover border border-gray-400 rounded-sm hover:border-black cursor-pointer"
            )}
            onClick={() => handleClickMiniImage(index)}
          />
        ))}
      </section>

      <div className="w-full lg:max-w-[40%] bg-[#f0f0f0] grid place-items-center rounded-sm overflow-hidden">
        <Image
          src={mainImage.imageUrl}
          alt={mainImage.name}
          width={600}
          height={600}
          className="sm:max-lg:w-full md:max-h-[600px] object-contain"
        />
      </div>
    </>
  );
}
