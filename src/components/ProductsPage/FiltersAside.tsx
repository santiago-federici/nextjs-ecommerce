'use client'

import { Button } from "@components/CustomButtons"
import { ArrowDown, ArrowUp, Close, Filter } from "@components/Icons"
import { motion, Variants } from 'framer-motion'
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const navVariants: Variants = {
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

const liVariants: Variants = {
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

const filters = [
  {
    id: 1,
    name: "Categories",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "T-Shirts",
        value: "tshirts"
      },
      {
        name: "Hoodies",
        value: "hoodies"
      },
      {
        name: "Snickers",
        value: "snickers"
      },
      {
        name: "Joggers",
        value: "joggers"
      }
    ]
  },
  {
    id: 2,
    name: "Brands",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Adidas",
        value: "adidas"
      },
      {
        name: "Puma",
        value: "puma"
      },
      {
        name: "Reebok",
        value: "reebok"
      },
      {
        name: "Vans",
        value: "vans"
      }
    ]
  },
  {
    id: 3,
    name: "Price",
    options: [
      {
        name: "Under $10",
        value: "10"
      },
      {
        name: "$10 - $20",
        value: "10-20"
      },
      {
        name: "$20 - $30",
        value: "20-30"
      },
      {
        name: "$30 - $40",
        value: "30-40"
      },
      {
        name: "Over $40",
        value: "40"
      }
    ]
  },
  {
    id: 4,
    name: "Rating",
    options: [
      {
        name: "5 Stars",
        value: "5"
      },
      {
        name: "4 Stars",
        value: "4"
      },
      {
        name: "3 Stars",
        value: "3"
      },
      {
        name: "2 Stars",
        value: "2"
      },
    ]
  },
  {
    id: 5,
    name: "Discount",
    options: [
      {
        name: "Only discount",
        value: "discount"
      },
      {
        name: "No discount",
        value: "nodiscount"
      }
    ]
  }
]

export function FiltersAside () {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState <number | null>(null)

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
  
  return(
    <>
      <span onClick={() => setIsOpen(true)}>
        <Button as="custom" text="Filters" icon={<Filter />} extraClassName="flex gap-2 border-secondary text-secondary border border-black hover:bg-zinc-300 h-fit" />
      </span>
      
      <AnimatePresence mode="wait">
        {
          isOpen &&
          <motion.nav 
            variants={navVariants}
            initial="inital"
            animate="open"
            exit="exit"
            className="grid py-4 px-6 bg-surface w-[60%] lg:w-[400px] h-full fixed top-0 right-0 origin-right overflow-y-auto modal-shadow z-20"
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
            <ul className='text-black grid gap-4 py-4 px-6 bg-surface w-full absolute top-16'>
              {
                filters.map((filter, index) => {
                  return (
                      <FilterItem 
                        key={index} 
                        index={index} 
                        filter={filter} 
                        activeFilter={activeFilter} 
                        setActiveFilter={setActiveFilter} 
                      />
                    )
                })
              }

              <motion.div 
                custom={filters.length + 1}
                variants={liVariants}
                initial="inital"
                animate="open"
                exit="exit"
                className="flex justify-between gap-2 mt-6"
              >
                <Button as="custom" text="Clear" extraClassName="w-full bg-red-600 border-red-600 hover:opacity-70" />
                <Button as="primary" text="Apply" extraClassName="w-full" />
              </motion.div>
            </ul> 
          </motion.nav>
        }
      </AnimatePresence>
    </>
  )
}

function FilterItem ({ index, filter, activeFilter, setActiveFilter }: { index: number, filter: any, activeFilter: number | null, setActiveFilter: any }) {
  return (
    <li>
      <motion.div 
        custom={index}
        variants={liVariants}
        initial="inital"
        animate="open"
        exit="exit"
      >
        <div 
          className="flex gap-2 items-center mb-2 cursor-pointer hover:opacity-70 w-full justify-between" 
          onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
        >
          <h3>{filter.name}</h3>
          {
            activeFilter === filter.id 
            ? <ArrowUp />
            : <ArrowDown />
          }
        </div>

        <AnimatePresence mode="wait">
          {
            activeFilter === filter.id &&
            <motion.div
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: 'auto'}}
              exit={{opacity: 0, height: 0}}
            >
              {
                filter.options.map((option: any, index: number) => {
                  return (
                    <li key={index}>
                      <label className="flex gap-2 cursor-pointer px-4 rounded-sm hover:bg-zinc-300">
                        <input type="checkbox" value={1} />
                        <span>{option.name}</span>
                      </label>
                    </li>
                  )
                })
              }
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </li>
  )
}