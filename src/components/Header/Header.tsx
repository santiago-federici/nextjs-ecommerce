'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Navbar } from './NavbarModal'
import { ProfileModal } from './ProfileModal'
import { CartModal } from './CartModal'

import { About, Cart, Contact, Home, Menu, Products } from '@components/Icons'



const navLinks = [
  {
    title: 'Home',
    icon: <Home />
  },
  {
    title: 'Products',
    icon: <Products />
  },
  {
    title: 'About',
    icon: <About />
  },
  {
    title: 'Contact',
    icon: <Contact />
  }
]

export function Header () {

  const { data: session } = useSession()

  const pathname = usePathname()

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <>
      <Navbar session={session} isOpen={navIsOpen} setIsOpen={setNavIsOpen} navLinks={navLinks} />
      <CartModal isOpen={cartIsOpen} setIsOpen={setCartIsOpen} />

      <header className='wrapper absolute flex justify-between items-center py-4 left-1/2 -translate-x-1/2'>
        <span 
          className={`${pathname === '/' ? 'text-white' : 'text-black'} lg:hidden cursor-pointer order-1 hover:scale-105 hover:opacity-70 transition duration-200`}
          onClick={() => setNavIsOpen(true)}
        >
          <Menu />
        </span>

        <h1 className={`${pathname === '/' ? 'text-white' : 'text-black'} hover:text-accent text-5xl md:text-6xl cursor-pointer transition duration-200 order-3 lg:order-1`}>Ecom</h1>

        <ul className={`${pathname === '/' ? 'text-white' : 'text-black'} hidden lg:flex gap-4 items-center order-2`}>
          {
            navLinks.map((link, index) => {
              return (
                  <li 
                    key={index}
                    className='font-medium flex gap-2 hover:text-accent cursor-pointer transition duration-200 uppercase'
                  >
                    <Link href={`/${link.title === 'Home' ? '' : link.title.toLowerCase()}`}>
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
            onClick={() => setCartIsOpen(true)}
            className={`${pathname === '/' ? 'text-white' : 'text-black'} cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200`}
          >
            <Cart />
          </span>

        </span>
      </header>
    </>
  )
}