import { Close } from "@components/Icons"
import { Button } from "@components/CustomButtons"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

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

export function Navbar ({ session, isOpen, setIsOpen, navLinks }: { session: any, isOpen: boolean, setIsOpen: any, navLinks: any }) {
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
  }, [screenWitdh, setIsOpen])

  const pathname = usePathname()
  
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  return(
    <AnimatePresence mode="wait">
      {
        isOpen &&
        <motion.nav 
          variants={navVariants}
          initial="inital"
          animate="open"
          exit="exit"
          className="grid py-4 px-6 bg-surface w-full md:w-[70svw] h-full fixed top-0 left-0 z-20 origin-left modal-shadow"
        >
          <motion.span 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:opacity-70 justify-self-end w-fit h-fit"
            custom={1}
            variants={liVariants}
          >
            <div className="hover:-rotate-180 transition duration-500">
              <Close />
            </div>
          </motion.span>
          <ul className='text-black grid gap-2 py-4 px-6 bg-surface top-16 w-full absolute items-center'>
            {
              navLinks.map((link: any, index: number) => {
                return (
                  <motion.div
                    custom={index}
                    variants={liVariants}
                    initial="inital"
                    animate="open"
                    exit="exit"
                    key={index}
                  >
                    <motion.li
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                      className="transition duration-200"
                    >
                      <Link 
                        href={link.href}
                        className={clsx(
                          'font-medium text-lg flex gap-2 cursor-pointer hover:bg-zinc-400 w-full pl-2 py-2 rounded-md transition duration-200 uppercase',
                          {
                            'bg-zinc-300': pathname === link.href 
                          }
                        )}
                      >
                        <span className='lg:hidden'>
                          {link.icon}
                        </span>
                        {link.title}
                      </Link>
                    </motion.li>
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
  )
}
