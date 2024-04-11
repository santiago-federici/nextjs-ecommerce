'use client'

import { useSession } from 'next-auth/react'

import { Navbar } from './NavbarModal'
import { ProfileModal } from './ProfileModal'
import { CartModal } from './CartModal'

import '@styles/Header.css'

export function Header () {

  const { data: session } = useSession()

  
  return (
    <header className='flex py-4 justify-between items-center wrapper absolute left-1/2 -translate-x-1/2 mx-auto'>
      <Navbar session={session} />

      <h1 className='text-white text-5xl md:text-6xl order-3 lg:order-1 cursor-pointer hover:text-accent transition duration-200'>Ecom</h1>

      <span className='flex gap-4 order-4'>
        
        <ProfileModal session={session} />


        <CartModal />

      </span>

    </header>
  )
}