import Image from "next/image";

export function Card({ prodName, price, prevPrice, image, isOffer }: { prodName: string, price: number, prevPrice?: number, image: string, isOffer?: number }) {
  return (
    <article className="grid bg-white rounded-sm shadow-md overflow-hidden">
      <div className="relative h-60">
        <Image
          src={image}
          alt={prodName}
          layout="fill"
          objectFit="cover"
        />

        {
          isOffer && 
          <span className="bg-green-500 text-white text-sm font-semibold py-1 px-2 rounded-md absolute top-2 right-2">{isOffer}
            % OFF
          </span>
        }
      </div>

      <div className="p-4">
        <h3 className="text-lg">{prodName}</h3>
        <div className="grid items-center">
          {
            prevPrice && <p className="text-sm text-gray-500 line-through mt-1">${prevPrice}</p>
          }
          <p className="text-gray-900 text-2xl">${price}</p>
        </div>
      </div>
    </article>
  );
}
