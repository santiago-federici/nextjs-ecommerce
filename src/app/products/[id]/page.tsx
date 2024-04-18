import { Card } from "@components/Card"
import { Button } from "@components/CustomButtons"
import { BackArrow, Minus, Plus } from "@components/Icons"

import prods from '@mocks/prods.json'
import Image from "next/image"
import Link from "next/link"

export default function ProductDetail ({ params }: { params: { id: number } }) {

  const prod = prods[0]

  
  return(
    prod &&
    <div className='wrapper pt-[120px] p/b-[200px]'>
      <Link href={'/products'} className="cursor-pointer hover:bg-zinc-400 transition duration-200 w-10 h-10 rounded-full p-1 flex items-center">
        <BackArrow />
      </Link> 
      
      <article className="grid gap-4 mt-10">

        <h3 className="text-4xl">{prod.prodName}</h3>

        <Image 
          src={prod.image}
          alt={prod.prodName}
          width={900}
          height={900}
          className="w-full h-auto"
          />

        <p className="text-3xl font-semibold">${prod.price}</p>

        <section>
          <p>Color:</p>
          <div className="flex gap-4">
            <span className="w-10 h-10 bg-red-300 rounded-full cursor-pointer hover:border border-black"></span>
            <span className="w-10 h-10 bg-blue-300 rounded-full cursor-pointer hover:border border-black"></span>
            <span className="w-10 h-10 bg-orange-300 rounded-full cursor-pointer hover:border border-black"></span>
          </div>
        </section>

        <section>
          <p>Size:</p>
          <div className="flex gap-4">
            <span className="flex justify-center items-center w-10 h-10 bg-zinc-300 rounded-md cursor-pointer hover:bg-zinc-400">s</span>
            <span className="flex justify-center items-center w-10 h-10 bg-zinc-300 rounded-md cursor-pointer hover:bg-zinc-400">m</span>
            <span className="flex justify-center items-center w-10 h-10 bg-zinc-300 rounded-md cursor-pointer hover:bg-zinc-400">l</span>
          </div>
        </section>

        <section className="flex gap-12 w-full border border-black justify-center items-center rounded-md py-2 mb-60">
          <Minus />
          <p>1</p>
          <Plus />
        </section>

        <Button as="primary" text="Buy now" />
        <Button as="custom" text="Add to cart" extraClassName="border border-black text-secondary hover:scale-[1.01]" />

        <section>
          <h3>Description</h3>
          {/* <p>{prod.description}</p> */}
        </section>
 
        <section>
          <h3>Related products</h3>
          <div className="grid grid-cols-3 gap-4">
            {prods.map((prod) => (
              <Card key={prod.id} {...prod} />
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
