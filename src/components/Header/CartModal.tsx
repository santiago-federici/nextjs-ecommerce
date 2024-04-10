import { About, Cart, CloseMenu, Contact, Home, Menu, Products } from "@components/Icons"
import { Button } from "@components/Button"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { AnimatePresence, delay, motion, Variants } from "framer-motion"
import { Card } from "@components/Card"

const cartProds = [
  {
    name: 'Home',
    image: '/Nike-DriFit-Strike.webp',
    quantity: 1,
    price: 0
  },
  {
    name: 'Home',
    image: '/Nike-DriFit-Strike.webp',
    quantity: 1,
    price: 0
  },
  {
    name: 'Home',
    image: '/Nike-DriFit-Strike.webp',
    quantity: 1,
    price: 0
  },
  {
    name: 'Home',
    image: '/Nike-DriFit-Strike.webp',
    quantity: 1,
    price: 0
  }
]

const navVariants = {
  inital: {
    x: '100%'
  },
  open: {
    x: '0%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const liVariants = {
  inital: {
    x: '80px'
  },
  open: (index: number) => ({
    x: '0px',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.08
    }
  }),
  exit: (index: number) => ({
    x: '80px',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.08
    }
  })
}

export function CartModal () {
  const [isOpen, setIsOpen] = useState(false);
  
  return(
    <>
      <span 
        onClick={() => setIsOpen(prev => !prev)}
        className={`${isOpen ? 'text-black' : 'text-white'} cursor-pointer hover:text-accent transition duration-200 z-20`}
      >
        {isOpen ? <CloseMenu /> : <Cart />}
      </span>
    
      <AnimatePresence mode="wait">
        {
          isOpen &&
          <motion.nav 
            variants={navVariants}
            initial="inital"
            animate="open"
            exit="exit"
            className="grid py-4 px-6 bg-surface w-[80svw] lg:w-[400px] h-full absolute top-0 right-0 z-10 origin-right modal-shadow"
          >
            <ul className='text-black grid gap-4 py-4 px-6 bg-surface top-16 w-full absolute items-center'>
              {
                cartProds.map((prod, index) => {
                  return (
                      <motion.div 
                        key={index}
                        custom={index}
                        variants={liVariants}
                        initial="inital"
                        animate="open"
                        exit="exit"
                      >
                        <li>
                          <Card 
                            prodName={prod.name} 
                            price={prod.price} 
                            image={prod.image}
                          />
                        </li>
                      </motion.div>
                    )
                })
              }
            </ul> 
          </motion.nav>
        }
      </AnimatePresence>
    </>
  )
}
