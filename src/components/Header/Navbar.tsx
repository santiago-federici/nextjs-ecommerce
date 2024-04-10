import { About, Contact, Home, Menu, Products } from "@components/Icons";
import { NavItem } from "./NavItem";
import { Button } from "@components/Button";
import { signIn } from "next-auth/react";

export function Navbar ({ menuId, session }: { menuId: string, session: any }) {
  return(
    <>
      <label htmlFor={menuId} className=' text-white menu-icon lg:hidden cursor-pointer hover:text-accent transition duration-200 order-1'>
        <Menu />
      </label>

      <input type="checkbox" hidden id={menuId} />

      <nav className='menu absolute lg:relative w-full lg:w-auto order-2'>
        {/* <ul className='grid lg:flex gap-4 py-4 px-6 lg:py-0 lg:px-0 bg-surface lg:bg-transparent absolute lg:relative top-16 lg:top-0 w-full lg:w-auto'> */}
        <ul className='text-white grid lg:flex gap-4 py-4 px-6 lg:py-0 lg:px-0 bg-surface lg:bg-transparent top-16 lg:top-0 w-full absolute lg:relative items-center'>
          <NavItem icon={<Home />} label={'Home'} />
          <NavItem icon={<Products />} label={'Products'} />
          <NavItem icon={<About />} label={'About'} />
          <NavItem icon={<Contact />} label={'Contact'} />

          { 
            !session?.user
            ? <span onClick={() => signIn()}><Button as='primary' text='Login' extraClassName='lg:hidden w-full' /></span>
            : <></>
          }
        </ul> 
      </nav>
    </>

  )
}