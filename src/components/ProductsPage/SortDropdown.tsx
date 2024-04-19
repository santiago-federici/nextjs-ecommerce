'use client'

import { useState } from 'react'

import { motion, Variants } from 'framer-motion'
import { Sort } from '@components/Icons'
import { Button } from '@components/CustomButton'

const ulVariants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 4px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05
    }
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  }
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24 
    }
  },
  closed: { 
    opacity: 0, 
    y: 15, 
    transition: { 
      duration: 0.2 
    } 
  }
}

const sortOptions = [
  {
    name: "Price: Low to High",
    value: "price-asc"
  },
  {
    name: "Price: High to Low",
    value: "price-desc"
  },
  {
    name: "Name: A to Z",
    value: "name-asc"
  },
  {
    name: "Name: Z to A",
    value: "name-desc"
  },
  {
    name: "Rating: High to Low",
    value: "rating-desc"
  },
  {
    name: "Rating: Low to High",
    value: "rating-asc"
  },
  {
    name: "Discount: High to Low",
    value: "discount-desc"
  },
  {
    name: "Discount: Low to High",
    value: "discount-asc"
  },
  {
    name: "Popularity",
    value: "popularity"
  },
  {
    name: "Latest",
    value: "latest"
  },
]

export function SortDropdown () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative"
    >
      <motion.span
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Button text='Sort' icon={<Sort />} className='flex gap-2 text-[#000] bg-slate-300 border-slate-900' />
      </motion.span>
      <motion.ul
        variants={ulVariants}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="absolute bg-zinc-300 w-fit mt-2 text-nowrap grid gap-2 z-50"
      >
        {
          sortOptions.map((option, index) => (
            <motion.li 
              key={index} 
              variants={itemVariants}
              className="px-4 py-1 rounded-sm hover:bg-zinc-400 cursor-pointer transition duration-200"
            >{option.name}</motion.li>
          ))
        }
      </motion.ul>
    </motion.nav>
  )
}