'use client'

import { useEffect, useId, useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/react'

import Image from 'next/image'


import { About, Cart, CloseMenu, Contact, Home, Menu, Products, UserCircle } from './Icons'
import { NavItem } from './NavItem'
import { Button } from './Button'

import '@styles/Navbar.css'

export function Navbar () {

  const { data: session } = useSession()

  const profileId = useId()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // close menu when screen is greater than 768px
  const [screenWitdh, setScreenWitdh] = useState(0)
  const mdTailwindWidth = 768 // <--- width of the tailwind md:
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
    <nav className='flex py-4 justify-between wrapper'>
      <h1 className='text-5xl md:text-6xl'>Ecom</h1>

      <div className='flex gap-4 md:gap-8 items-center'>
        {
          !isMenuOpen &&
          <span className='md:hidden' onClick={() => setIsMenuOpen(prev => !prev)}>
            <Menu />
          </span>
        }

        <ul className={`${isMenuOpen ? 'block' : 'hidden'} grid md:flex gap-4 py-4 px-6 md:px-0 md:py-0 bg-[--clr-surface] z-50 md:z-auto md:bg-transparent absolute md:relative top-16 md:top-0 w-[101%] left-[-1px] md:w-auto`}>
          <NavItem icon={<Home />} label={'Home'} />
          <NavItem icon={<Products />} label={'Products'} />
          <NavItem icon={<About />} label={'About'} />
          <NavItem icon={<Contact />} label={'Contact'} />

          { !session?.user
            ? (
              <span onClick={() => signIn()}><Button as='primary' text='Sign in' extraClassName='md:hidden w-full' /></span>
            )
            : <></>
          }
        </ul>

        {
          isMenuOpen
          ? <span className='md:hidden justify-self-end' onClick={() => setIsMenuOpen(prev => !prev)}>
              <CloseMenu />
            </span>
          : <>
          { 
            session?.user 
            ? (
            <>
              <label htmlFor={profileId} className='profile-icon'>
                <UserCircle />
              </label>
              <input type="checkbox" hidden id={profileId} />
              <div className='profile-dropdown'>
                <p>{session?.user.name}</p>
                <p>{session?.user.email}</p>
                <Image src={session?.user.image || ''} width={50} height={50} alt="profile image" />
                <button onClick={() => signOut({callbackUrl: '/'})} className='primary-btn'>Logout</button>
              </div>
            </>
            )
            :(
              <>
              <span onClick={() => signIn()}><Button as='primary' text='Sign in' extraClassName='hidden md:block' /></span>
              </>
            )
          }

            <Cart />
          </>
        }
      </div>
    </nav>
  )
}