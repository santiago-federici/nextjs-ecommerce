import { Button } from "@components/CustomButtons";
import { UserCircle } from "@components/Icons";
import { signIn, signOut } from "next-auth/react";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

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

  
  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative hidden lg:flex"
    >
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => setIsOpen(!isOpen)}
        className="text-white cursor-pointer hover:text-accent transition duration-200"
      >
        <UserCircle />
      </motion.button>
      <motion.ul
        variants={{
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
        }}
        style={{ 
          pointerEvents: isOpen ? "auto" : "none", 
          top: "calc(100% + 10px)", // Adjust this value to adjust the distance between nav and ul
          left: "50%",
          transform: "translateX(-50%)" 
        }}
        className="absolute grid w-[200px] gap-4 py-4 px-6 text-nowrap bg-surface"
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
              <Button as='primary' text='Login' extraClassName='w-full' />
            </motion.li>
            <motion.li onClick={() => signIn()} variants={itemVariants}>
              <Button as='primary' text='Register' extraClassName='w-full' />
            </motion.li>
          </>
        }
      </motion.ul>
    </motion.nav>
  )
}