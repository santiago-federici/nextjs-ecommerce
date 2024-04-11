import { Close } from "@components/Icons"
import { AnimatePresence, motion } from "framer-motion"
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

export function CartModal ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) {

  return(
    <AnimatePresence mode="wait">
      {
        isOpen &&
        <motion.nav 
          variants={navVariants}
          initial="inital"
          animate="open"
          exit="exit"
          className="grid py-4 px-6 bg-surface w-[80%] lg:w-[400px] h-full absolute top-0 right-0 origin-right modal-shadow z-20"
        >
          <motion.span 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:text-accent justify-self-end w-fit h-fit"
            custom={1}
            variants={liVariants}
          >
            <Close />
          </motion.span>
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
  )
}
