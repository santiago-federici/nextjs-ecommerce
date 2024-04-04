import Image from "next/image";

export function Card ({ prodName, price }: { prodName: string, price: string }) {
  return (
    <article className="grid gap-8 place-content-center">
      <Image
        src="/sunglass-1.png"
        alt="sunglasses"
        width={230}
        height={114}
        quality={100}
        className="justify-self-center"
        />

      <div className="px-2 grid gap-2">
        <p className="text-xl">{prodName}</p>
        <p className="font-medium text-2xl">${price} <span className="text-green-500 text-xs align-text-top">15% OFF</span> </p>
      </div>
    </article>
  )
}