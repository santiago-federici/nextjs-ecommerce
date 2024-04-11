'use client'

import { useSession } from 'next-auth/react'

import { Navbar } from './NavbarModal'
import { ProfileModal } from './ProfileModal'
import { CartModal } from './CartModal'

import '@styles/Header.css'
import { About, Cart, Contact, Home, Menu, Products } from '@components/Icons'
import { useState } from 'react'


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

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <>
      <Navbar session={session} isOpen={navIsOpen} setIsOpen={setNavIsOpen} navLinks={navLinks} />
      <CartModal isOpen={cartIsOpen} setIsOpen={setCartIsOpen} />

      <header className='wrapper absolute flex justify-between items-center py-4 left-1/2 -translate-x-1/2'>
        <span 
          className='text-white hover:text-accent lg:hidden cursor-pointer transition duration-200 order-1'
          onClick={() => setNavIsOpen(true)}
        >
          <Menu />
        </span>

        <h1 className='text-white hover:text-accent text-5xl md:text-6xl cursor-pointer transition duration-200 order-3 lg:order-1'>Ecom</h1>

        <ul className='hidden lg:flex gap-4 text-white items-center order-2'>
          {
            navLinks.map((link, index) => {
              return (
                  <li 
                    key={index}
                    className='font-medium flex gap-2 hover:text-accent cursor-pointer transition duration-200 uppercase'
                  >
                    {link.title}
                  </li>
                )
            })
          }
        </ul>

        <span className='flex gap-4 order-4'>
          
          <ProfileModal session={session} />

          <span 
            onClick={() => setCartIsOpen(true)}
            className='text-white hover:text-accent cursor-pointer transition duration-200'
          >
            <Cart />
          </span>

        </span>
      </header>
    </>
  )
}