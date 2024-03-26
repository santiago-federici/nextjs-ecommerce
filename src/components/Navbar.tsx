'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export function Navbar () {

  const { data: session } = useSession()

  return (
    <nav>
      <p>Navbar</p>
      { session?.user 
      ? (
        <>
        <div>
          <p>{session?.user.name}</p>
          <p>{session?.user.email}</p>
          <Image src={session?.user.image || ''} width={50} height={50} alt="profile image" />
        </div>

        <button onClick={() => signOut({
          callbackUrl: '/'
        })}>Logout</button>
        </>
      )
      :(
        <button onClick={() => signIn()}>SignIn</button>
      )}
    </nav>
  )
}