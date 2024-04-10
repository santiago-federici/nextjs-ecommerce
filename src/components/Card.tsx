import Image from "next/image";

export function Card ({ prodName, price, image }: { prodName: string, price: number, image: string }) {
  return (
    <article className="grid gap-8 place-content-center">
      <Image
        src={image}
        alt="sunglasses"
        width={230}
        height={114}
        quality={100}
        className="justify-self-center w-[150px] md:w-[230px]"
      />

      <div className="px-2 grid gap-2">
        <p className="text-md md:text-xl text-heading">{prodName}</p>
        <p className="font-medium text-xl md:text-2xl">${price} <span className="text-green-500 text-xs align-text-top">15% OFF</span> </p>
      </div>
    </article>
  )
}