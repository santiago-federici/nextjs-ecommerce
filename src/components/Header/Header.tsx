'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { NavbarSheet } from './NavbarSheet'
import { ProfileModal } from './ProfileModal'
import { CartSheet } from './CartSheet'

import { About, Contact, Home, LogoSVG, Menu, Products } from '@components/Icons'
import { useCart } from '@hooks/useCart'

import clsx from 'clsx';
import { Wrapper } from '@components/Wrapper'

const headerInfo = {
  logo: <LogoSVG />
}

const navLinks = [
  {
    title: 'Home',
    href: '/',
    icon: <Home />
  },
  {
    title: 'Products',
    href: '/products',
    icon: <Products />
  },
  {
    title: 'About',
    href: '/about',
    icon: <About />
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: <Contact />
  }
]

export function Header () {

  const { data: session } = useSession()

  const pathname = usePathname()

  const { cartQuantity } = useCart()

  return (
    <header className='w-full'>

      <Wrapper className='py-4 flex justify-between items-center'>
        <span className={`${pathname === '/' ? 'text-white' : 'text-black'} lg:hidden cursor-pointer order-1 hover:scale-105 hover:opacity-70 transition duration-200`}>
          <NavbarSheet navLinks={navLinks} session={session} />
        </span>

        <Link href={'/'} className='order-3 lg:order-1'>
          <h1 className={`${pathname === '/' ? 'text-white' : 'text-black'} hover:text-custom-accent text-5xl md:text-6xl cursor-pointer transition duration-200`}>
            {headerInfo.logo}
          </h1>
        </Link>

        <ul className={`${pathname === '/' ? 'text-white' : 'text-black'} hidden lg:flex gap-4 items-center order-2`}>
          {
            navLinks.map((link, index) => {
              return (
                  <li 
                    key={index}
                    className={clsx(
                      'font-medium flex gap-2 hover:text-custom-accent cursor-pointer transition duration-200 uppercase',
                      {
                        'text-custom-accent' : pathname === link.href
                      }
                    )}
                  >
                    <Link href={link.href}>
                      {link.title}
                    </Link>
                  </li>
                )
            })
          }
        </ul>

        <span className='flex gap-4 order-4'>
          
          <ProfileModal session={session} />

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