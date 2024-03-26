'use client'

import { signIn, useSession } from 'next-auth/react'

export function Navbar () {

  const { data: session } = useSession()

  return (
    <nav>
      <p>Navbar</p>
      <button onClick={() => signIn()}>SignIn</button>
    </nav>
  )
}