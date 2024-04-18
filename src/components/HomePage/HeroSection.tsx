'use client'

import { Button } from '@components/Button'
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
    <div className='hero-bg'>
      <Wrapper className='pt-[220px] lg:pt-[250px] pb-[200px] grid place-items-center lg:place-items-start gap-8'>
        <h1 className='text-white text-center lg:text-left lg:max-w-xl'>{sectionInfo.title}</h1>

        <Link href={sectionInfo.btn.href}>
          <Button 
            as='outline' 
            text={sectionInfo.btn.text}
            className='text-white border-white hero-btn-effect z-10'
          />
        </Link>
      </Wrapper>
    </div>
  )
}
