import Image from "next/image";

export function Card ({ prodName, price, prevPrice, image, isOffer, extraClassname }: { prodName: string, price: number, prevPrice: number, image: string, isOffer: number, extraClassname: string }) {
  return (
    <article className={`grid gap-6 relative overflow-hidden ${extraClassname}`}>
      {
        isOffer &&
        <span className="absolute top-[20px] right-[-50px] w-[200px] bg-green-500 text-white text-center text-sm font-semibold py-1 px-2 rotate-[30deg]">
          {isOffer}% OFF
        </span>
      }
      
      <Image
        src={image}
        alt="shirt"
        width={500}
        height={500}
        className="w-full h-auto aspect-square"
      />

      <div className="grid gap-2 px-2 text-nowrap">
        <p className="text-heading text-lg">{prodName}</p>
        <p className="text-2xl md:text-3xl font-semibold">
          <span className="text-gray-500 text-lg line-through mr-4">
            ${prevPrice}
          </span>
          ${price}
        </p>
      </div>
    </article>
  )
}