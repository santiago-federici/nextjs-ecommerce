'use client'

import Image from "next/image";

import prods from '@mocks/prods.json'

export function Card({ id }: { id: number }) {

  const prod = prods.find(prod => prod.id === id)
  
  return (
    prod &&
    <article className="grid bg-white rounded-sm shadow-md overflow-hidden">
      <div className="relative h-60">
        <Image
          src={prod.image}
          alt={prod.prodName}
          layout="fill"
          objectFit="cover"
        />

        {
          prod.isOffer && 
          <span className="bg-green-500 text-white text-sm font-semibold py-1 px-2 rounded-md absolute top-2 right-2">{prod.isOffer}
            % OFF
          </span>
        }
      </div>

      <div className="p-4">
        <h3 className="text-lg">{prod.prodName}</h3>
        <div className="grid items-center">
          {
            prod.prevPrice && <p className="text-sm text-gray-500 line-through mt-1">${prod.prevPrice}</p>
          }
          <p className="text-gray-900 text-2xl">${prod.price}</p>
        </div>
      </div>
    </article>
  )
}
