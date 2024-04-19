import { Button } from "@components/CustomButton";
import { UserCircle } from "@components/Icons";
import { signIn, signOut } from "next-auth/react";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

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
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export function ProfileModal ({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname()

  
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative hidden lg:flex"
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${pathname === '/' ? 'text-white' : 'text-black'} cursor-pointer hover:scale-105 hover:opacity-70 transition duration-200`}
      >
        <UserCircle />
      </motion.button>
      <motion.ul
        variants={ulVariants}
        style={{ 
          pointerEvents: isOpen ? "auto" : "none", 
          top: "calc(100% + 10px)",
          left: "50%",
          transform: "translateX(-50%)" 
        }}
        className={`absolute grid w-[200px] gap-4 py-4 px-6 text-nowrap ${pathname === '/' ? 'bg-surface' : 'bg-zinc-300'}`}
      >
        {
          session?.user 
          ? 
          <>
            <motion.li variants={itemVariants}>User settings</motion.li>
            <motion.li variants={itemVariants}>My orders</motion.li>
            <motion.li variants={itemVariants}>My account</motion.li>
            <motion.li onClick={() => signOut()}variants={itemVariants}>Logout</motion.li>
          </>
          :
          <>
            <motion.li onClick={() => signIn()} variants={itemVariants}>
              <Button as='filled' text='Login' className='w-full' />
            </motion.li>
            <motion.li onClick={() => signIn()} variants={itemVariants}>
              <Button as='filled' text='Register' className='w-full' />
            </motion.li>
          </>
        }
      </motion.ul>
    </motion.nav>
  )
}