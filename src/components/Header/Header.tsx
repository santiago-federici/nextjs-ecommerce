'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { useCart } from '@hooks/useCart'

import { CartSheet } from './CartSheet'
import { NavbarComponent } from './NavbarComponent'
import { ProfileModal } from './ProfileModal'
import { Wrapper } from '@components/Wrapper'

import { LogoSVG } from '@components/Icons'

const headerInfo = {
  logo: <LogoSVG />
}

export function Header () {

  const { data: session } = useSession()

  const pathname = usePathname()

  const { cartQuantity } = useCart()

  return (
    <header className='w-full'>

      <Wrapper className='py-4 flex justify-between items-center'>
        <NavbarComponent session={session} />

        <Link href={'/'} className='order-2 lg:order-1'>
          <h1 className={`${pathname === '/' ? 'text-white' : 'text-black'} hover:text-custom-accent text-5xl md:text-6xl cursor-pointer transition duration-200`}>
            {headerInfo.logo}
          </h1>
        </Link>

        <span className='flex gap-4 order-3'>
          
          <div className='hidden lg:flex'>
            <ProfileModal session={session} />
          </div>

          <span 
            className={`${pathname === '/' ? 'text-white' : 'text-black'} cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200 relative flex items-center justify-center`}
          >
            <CartSheet />
            <span className='absolute -bottom-2 -right-1 bg-custom-accent text-white font-semibold rounded-full w-5 h-5 flex justify-center items-center text-sm'>{cartQuantity}</span>
          </span>

        </span>
      </Wrapper>
    </header>
  )
}