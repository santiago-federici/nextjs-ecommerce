'use client'

import { useEffect, useId, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Button } from '../Button'
import { Cart, UserCircle } from '../Icons'
import { Navbar } from './Navbar'

import '@styles/Header.css'
import { ProfileModal } from './ProfileModal'
import { CartModal } from './CartModal'

export function Header () {

  const { data: session } = useSession()

  const menuId = useId()
  const profileId = useId()
  const cartId = useId()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // close menu when screen is greater than 1024px
  const [screenWitdh, setScreenWitdh] = useState(0)
  const mdTailwindWidth = 1024 // <--- width of the tailwind lg:
  useEffect(() => {
    const handleResize = () => {
      setScreenWitdh(window.innerWidth)
      screenWitdh >= mdTailwindWidth ? setIsMenuOpen(false) : null
    }

    window.addEventListener('resize', handleResize) 

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWitdh])

  return (
    <header className='flex py-4 justify-between items-center'>
      <Navbar menuId={menuId} session={session} />

      <h1 className='text-5xl md:text-6xl order-3 lg:order-1 cursor-pointer hover:text-accent'>Ecom</h1>

      <span className='flex gap-4 order-4'>
        <ProfileModal profileId={profileId} session={session} />


        <CartModal cartId={cartId} />

      </span>

    </header>
  )
}