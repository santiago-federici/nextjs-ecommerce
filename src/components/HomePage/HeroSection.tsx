'use client'

import { Button } from '@components/Button'

import '@/styles/HeroSection.css'

const heroSectionInfo = {
  title: 'Dress to Impress. Enter Our Fashion Wonderland',
  btnText: 'Shop now'
}

export function HeroSection () {
  return (
    <section className='hero-bg'>
      <div className='wrapper pt-[220px] lg:pt-[250px] pb-[200px] grid place-items-center lg:place-items-start gap-8'>
        <h1 className='text-white text-center lg:text-left lg:max-w-xl'>{heroSectionInfo.title}</h1>

        <Button 
          as='ghost' 
          text={heroSectionInfo.btnText}
        />
      </div>
    </section>
  )
}
