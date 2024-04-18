'use client'

import { Button } from '@components/CustomButtons'
import { Wrapper } from '@components/Wrapper'

const heroSectionInfo = {
  title: 'Dress to Impress. Enter Our Fashion Wonderland',
  btnText: 'Shop now'
}

export function HeroSection () {
  return (
    <div className='hero-bg'>
      <Wrapper className='pt-[220px] lg:pt-[250px] pb-[200px]'>
        <div className='grid place-items-center lg:place-items-start gap-8'>
          <h1 className='text-white text-center lg:text-left lg:max-w-xl'>{heroSectionInfo.title}</h1>

          <Button 
            as='ghost' 
            text={heroSectionInfo.btnText}
            />
        </div>
      </Wrapper>
    </div>
  )
}
