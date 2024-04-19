'use client'

import { Button } from '@components/CustomButton'
import { Wrapper } from '@components/Wrapper'
import Link from 'next/link'

const sectionInfo = {
  title: 'Dress to Impress. Enter Our Fashion Wonderland',
  btn: {
    text: 'Shop now',
    href: '/products'
  }
}

export function HeroSection () {
  return (
    <Wrapper className='py-[180px] lg:py-[200px] flex flex-col justify-center items-center lg:items-start gap-8'>
      <div className='hero-bg'>
      </div>
      <h1 className='text-white text-center lg:text-left lg:max-w-xl'>{sectionInfo.title}</h1>

      <Link href={sectionInfo.btn.href}>
        <Button 
          as='outline' 
          text={sectionInfo.btn.text}
          className='text-white border-white hero-btn-effect z-10'
        />
      </Link>
    </Wrapper>
  )
}
