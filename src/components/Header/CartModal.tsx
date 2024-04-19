import { BigCart, Close } from "@components/Icons"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "@hooks/useCart"
import { CartCard } from "@components/CartCard"
import { Button } from "@components/Button"

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

export function CartModal ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) {

  const { cart } = useCart()

  return(
    <AnimatePresence mode="wait">
      {
        isOpen &&
        <motion.nav 
          variants={navVariants}
          initial="inital"
          animate="open"
          exit="exit"
          className="grid py-4 px-6 bg-surface w-[80svw] md:w-[400px] h-full fixed top-0 right-0 origin-right overflow-y-auto modal-shadow z-20"
        >
          <motion.span 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:opacity-70 justify-self-end w-fit h-fit"
            custom={1}
            variants={liVariants}
          >
            <div className="hover:rotate-180 transition duration-500">
              <Close />
            </div>
          </motion.span>
          { cart.length < 1 
            ?
            <div className="flex flex-col items-center gap-8">
              <BigCart />
              <p className="text-3xl font-bold">Your cart is empty!</p>
              <Button as="filled" text="Shop now" />
            </div>
            :
            <ul className='text-black grid gap-4 py-4 px-6 bg-surface top-16 w-full absolute items-center'>
              {
                cart.map((prod, index) => {
                return (
                    <li key={index}>
                      <motion.div 
                        custom={index}
                        variants={liVariants}
                        initial="inital"
                        animate="open"
                        exit="exit"
                      >
                          <CartCard 
                            id={prod.id}
                            quantity={prod.quantity}
                          />
                      </motion.div>
                    </li>
                  )
                })
              }
            </ul> 
          }
        </motion.nav>
      }
    </AnimatePresence>
  )
}