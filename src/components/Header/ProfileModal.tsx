import { Button } from "@components/Button";
import { UserCircle } from "@components/Icons";
import { signIn, signOut } from "next-auth/react";

export function ProfileModal ({ profileId, session }: { profileId: string, session: any }) {
  return (
    <>
      <label htmlFor={profileId} className='profile-menu-icon hidden lg:flex cursor-pointer hover:text-accent'>
        <UserCircle />
      </label>

      <input type="checkbox" hidden id={profileId} />

      <ul className='profile-menu absolute top-16 w-fit gap-4 p-2 shadow-2xl text-nowrap'>
        {
          session?.user 
          ? 
          <>
            <li>User settings</li>
            <li>My orders</li>
            <li>My account</li>
            <li onClick={() => signOut()}>Logout</li>
          </>
          :
          <>
            <li onClick={() => signIn()}>
              <Button as='primary' text='Login' extraClassName='w-full' />
            </li>
            <li onClick={() => signIn()}>
              <Button as='primary' text='Register' extraClassName='w-full' />
            </li>
          </>
        }
      </ul>
    </>
  )
}