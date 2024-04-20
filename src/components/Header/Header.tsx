'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Wrapper } from '@components/Wrapper'
import { CartSheet } from './CartSheet'
import { NavbarComponent } from './NavbarComponent'
import { ProfileDropdown } from './ProfileModal'

import { LogoSVG } from '@components/Icons'

const headerInfo = {
  logo: <LogoSVG />
}

export function Header () {

  const { data: session } = useSession()

  const pathname = usePathname()


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
          
          <ProfileDropdown session={session} pathname={pathname} />

          <CartSheet pathname={pathname} />

        </span>
      </Wrapper>
    </header>
  )
}