import Image from "next/image";
import { UserCircle } from "./Icons";
import { signOut } from "next-auth/react";

export function UserSettings ({ profileId, session }: { profileId: string, session: any }) {
  return (
    <>
      <label htmlFor={profileId} className='profile-icon'>
        <UserCircle />
      </label>
      <input type="checkbox" hidden id={profileId} />
      <div className='profile-dropdown'>
        <p>{session?.user.name}</p>
        <p>{session?.user.email}</p>
        <Image src={session?.user.image || ''} width={50} height={50} alt="profile image" />
        <button onClick={() => signOut({callbackUrl: '/'})} className='primary-btn'>Logout</button>
      </div>
    </>
  )
}