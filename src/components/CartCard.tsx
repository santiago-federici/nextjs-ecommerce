import prods from '@mocks/prods.json'
import Image from 'next/image'
import { Minus, Plus, Trash } from './Icons'
import { useCart } from '@hooks/useCart'

export function CartCard ({ id, quantity }: { id: number, quantity: number }) {

  const prod = prods.find(prod => prod.id === id)

  const { increaseQuantity, decreaseQuantity, removeProd } = useCart()
  
  return (
    prod&&
    <article className='flex gap-4 w-full'>
      <Image
        src={prod.image}
        alt={prod.prodName}
        width={128}
        height={128}
        className='w-32 h-32'
      />

      <section className='py-2 flex flex-col gap-2 w-full'>
        <div className='flex-1'>
          <h3 className='text-base md:text-lg'>{prod.prodName}</h3>
          <p className='text-xl font-semibold'>{prod.price}</p>
        </div>

        <div className='flex  items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span onClick={() => decreaseQuantity(id)} className='cursor-pointer hover:text-custom-accent transition duration-200'>
              <Minus />
            </span>
            <p className='text-lg'>{quantity}</p>
            <span onClick={() => increaseQuantity(id)} className='cursor-pointer hover:text-custom-accent transition duration-200'>
              <Plus />
            </span>
          </div>

          <span onClick={() => removeProd(id)} className='cursor-pointer hover:text-custom-accent transition duration-200'>
            <Trash />
          </span>
        </div>
      </section>
    </article>
  )
}