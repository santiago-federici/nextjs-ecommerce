import { About, CloseMenu, Contact, Home, Menu, Products } from "@components/Icons"
import { Button } from "@components/Button"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { AnimatePresence, delay, motion, Variants } from "framer-motion"

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

const navVariants = {
  inital: {
    x: '-100%'
  },
  open: {
    x: '0%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const liVariants = {
  inital: {
    x: '-80px'
  },
  open: (index: number) => ({
    x: '0px',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.05
    }
  }),
  exit: (index: number) => ({
    x: '-80px',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: index * 0.05
    }
  })
}

export function Navbar ({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [screenWitdh, setScreenWitdh] = useState(0)
  const mdTailwindWidth = 1024 // <--- width of the tailwind lg: class
  useEffect(() => {
    const handleResize = () => {
      setScreenWitdh(window.innerWidth)
      screenWitdh >= mdTailwindWidth ? setIsOpen(false) : null
    }
    window.addEventListener('resize', handleResize) 
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [screenWitdh])
  return(
    <>
      <span 
        className={`lg:hidden cursor-pointer hover:text-accent transition duration-200 order-1 z-20 ${isOpen ? 'text-black' : 'text-white'}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? <CloseMenu /> : <Menu />}
      </span>
    
      <AnimatePresence mode="wait">
        {
          isOpen &&
          <motion.nav 
            variants={navVariants}
            initial="inital"
            animate="open"
            exit="exit"
            className="grid py-4 px-6 bg-surface w-full md:w-[70svw] h-full absolute top-0 left-0 z-10 origin-left modal-shadow"
          >
            <ul className='text-black grid gap-4 py-4 px-6 bg-surface top-16 w-full absolute items-center'>
              {
                navLinks.map((link, index) => {
                  return (
                    <motion.div
                      custom={index}
                      variants={liVariants}
                      initial="inital"
                      animate="open"
                      exit="exit"
                      key={index}
                    >
                      <li className='font-medium flex gap-2 hover:text-accent cursor-pointer transition duration-200 uppercase'>
                        <span className='lg:hidden'>
                          {link.icon}
                        </span>
                        {link.title}
                      </li>
                    </motion.div>
                    )
                })
              }
              { 
                !session?.user
                ? (
                  <motion.span
                    custom={navLinks.length + 1}
                    variants={liVariants}
                    initial="inital"
                    animate="open"
                    exit="exit"
                    onClick={() => signIn()}>
                      <Button as='primary' text='Login' extraClassName='lg:hidden w-full' />
                  </motion.span>
                )
                : <></>
              }
            </ul> 
          </motion.nav>
        }
      </AnimatePresence>
    </>
  )
}


{/* <ul className={`${isOpen ? 'text-black' : 'text-white'} grid lg:flex gap-4 py-4 px-6 lg:py-0 lg:px-0 bg-surface lg:bg-transparent top-16 lg:top-0 w-full absolute lg:relative items-center`}> */}