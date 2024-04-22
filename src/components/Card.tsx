'use client'

import Link from 'next/link'
import Image from "next/image";

import { useCart } from "@hooks/useCart";

import { AddToCart } from "./Icons";
import { Button } from "./CustomButton";

import prods from '@mocks/prods.json'


export function Card({ id }: { id: number }) {

  const { increaseQuantity } = useCart()
  
  const prod = prods.find(prod => prod.id === id)
  
  return (
    prod &&
    <article className="bg-white rounded-sm shadow-md overflow-hidden">
      <div className="relative h-60 cursor-pointer group grid place-items-center">

        <span className="absolute top-0 left-0 w-full h-full bg-black z-10 opacity-0 lg:group-hover:opacity-60 transition duration-300"></span>
        
        <span 
          onClick={() => increaseQuantity(id)}
          className="text-zinc-500 lg:group-hover:text-white absolute top-2 left-2 z-10 transition duration-200"
        >
          <div className="hover:text-custom-accent">
            <AddToCart />
          </div>
        </span>

        <Link href={`/products/${id}`}>
          <Button as='outline' text="See details" className="text-sm text-white border-white text-nowrap z-10 hidden lg:flex lg:opacity-0 lg:group-hover:opacity-100 hover:text-custom-accent hover:border-custom-accent" />
        </Link>

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

      <div className="p-4 grid h-fit place-content-start">
        <h3 className="text-lg lg:text-xl">{prod.prodName}</h3>
        <div className="grid lg:flex items-center lg:gap-2 lg:mt-2">
          {
            prod.prevPrice && <p className="text-sm text-gray-500 line-through mt-1">${prod.prevPrice}</p>
          }
          <p className="text-gray-900 text-xl lg:text-2xl font-semibold">${prod.price}</p>
        </div>
      </div>
    </article>
  )
}
