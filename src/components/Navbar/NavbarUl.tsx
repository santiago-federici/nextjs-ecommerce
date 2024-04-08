import { NavItem } from "./NavItem";
import { About, Contact, Home, Products } from '../Icons'
import { Button } from "../Button";
import { signIn } from 'next-auth/react'

export function NavbarUl ({ isMenuOpen, session }: { isMenuOpen: boolean, session: any }) {
  return (
    <ul className={`${isMenuOpen ? 'block' : 'hidden'} grid lg:flex gap-4 py-4 px-6 lg:px-0 lg:py-0 bg-surface z-50 lg:z-auto lg:bg-transparent absolute lg:relative top-16 lg:top-0 w-full lg:w-auto`}>
      <NavItem icon={<Home />} label={'Home'} />
      <NavItem icon={<Products />} label={'Products'} />
      <NavItem icon={<About />} label={'About'} />
      <NavItem icon={<Contact />} label={'Contact'} />

      { 
        !session?.user
        ? <span onClick={() => signIn()}><Button as='primary' text='Sign in' extraClassName='lg:hidden w-full' /></span>
        : <></>
      }
    </ul>
  )
}