'use client'

import { Card } from "@components/Card"
import { useState } from "react"

export function Carousel ({ prods }: { prods: any[] }) {
  const [currSlide, setCurrSlide] = useState(0)

  const handleNextSlide = () => {
    setCurrSlide(curr => (curr === prods.length - 1 ? 0 : curr + 1))
  }

  const handlePrevSlide = () => {
    setCurrSlide(curr => (curr ===  0 ? prods.length - 1 : curr - 1))
  }
  
  return(
    <article className="flex gap-6 overflow-hidden w-full sticky">
      <div className="flex justify-between w-full absolute top-1/2 -translate-y-full z-20 p-2">
        <span onClick={handlePrevSlide} className="bg-primary font-bold px-4 py-2 rounded-full cursor-pointer">❮</span>
        <span onClick={handleNextSlide} className="bg-primary font-bold px-4 py-2 rounded-full cursor-pointer">❯</span>
      </div>
      {
        prods.map((prod, index) => (
          <div key={index}>
            <Card 
              prodName={prod.prodName} 
              price={prod.price} 
              prevPrice={prod.prevPrice}
              image={prod.image} 
              isOffer={prod.isOffer}
              extraClassname='w-[400px] transition duration-500'
              currSlide={currSlide}
              />
          </div>
        ))
      }
    </article>
  )
}