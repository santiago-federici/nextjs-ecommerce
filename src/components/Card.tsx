import Image from "next/image";

export function Card ({ prodName, price, prevPrice, image, isOffer, extraClassname }: { prodName: string, price: number, prevPrice?: number, image: string, isOffer?: number, extraClassname?: string }) {
  return (
    <article className={`grid gap-4 relative overflow-hidden w-full h-auto ${extraClassname}`}>
      {
        isOffer &&
        <span className="absolute top-[20px] right-[-50px] w-[200px] bg-green-500 text-white text-center text-sm font-semibold py-1 px-2 rotate-[30deg]">
          {isOffer}% OFF
        </span>
      }

      <Image
        src={image}
        alt="shirt"
        width={400}
        height={400}
        className="w-full"
      />

      <div className="grid gap-2 px-2 text-nowrap">
        <p className="text-heading text-lg">{prodName}</p>
        <p className="text-2xl md:text-3xl font-semibold">
          {
            isOffer &&
            <span className="text-gray-500 text-lg line-through mr-4">
              ${prevPrice}
            </span>
          }
          ${price}
        </p>
      </div>
    </article>
  )
}