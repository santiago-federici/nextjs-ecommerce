'use client'

import { useEffect, useId, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { Button } from '../Button'
import { NavbarUl } from './NavbarUl'
import { UserSettings } from '@components/UserSettings'
import { Cart, CloseMenu, Menu } from '../Icons'

import '@styles/Navbar.css'

export function Navbar () {

  const { data: session } = useSession()

  const profileId = useId()

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
    <>
      <nav className='flex py-4 justify-between'>
        <h1 className='text-5xl md:text-6xl'>Ecom</h1>

        <div className='flex gap-4 md:gap-8 items-center'>
          {
            !isMenuOpen && 
              <>
                <span className='lg:hidden' onClick={() => setIsMenuOpen(prev => !prev)}>
                  <Menu />
                </span>
                <NavbarUl isMenuOpen={isMenuOpen} session={session} />
              </>
          }


          {
            isMenuOpen
            ? <span className='lg:hidden justify-self-end' onClick={() => setIsMenuOpen(prev => !prev)}>
                <CloseMenu />
              </span>
            : (
              <>
                { 
                  session?.user 
                  ? <UserSettings profileId={profileId} session={session} />
                  : <span onClick={() => signIn()}><Button as='primary' text='Sign in' extraClassName='hidden lg:inline' /></span>
                }

                <Cart />
              </>
            )
          }
        </div>

      </nav>
      {
        isMenuOpen &&
        <NavbarUl isMenuOpen={isMenuOpen} session={session} />
      }
    </>
  )
}