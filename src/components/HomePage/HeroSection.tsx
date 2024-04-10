'use client'

import '@/styles/HeroSection.css'
import { Button } from '@components/Button'

export function HeroSection () {
  return (
    <section className='mt-14 grid place-items-center lg:place-items-start gap-8'>
      <h1 className='text-white text-center lg:text-left lg:max-w-xl'>Dress to Impress. Enter Our Fashion Wonderland</h1>

      <Button as='ghost' text='Go to products' />
    </section>
  )
}
