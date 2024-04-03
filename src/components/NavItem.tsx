export function NavItem ({ icon, label} : {icon: React.ReactNode, label: string}) {

  return(
    <li className='flex gap-2 items-center '>
        <span className='md:hidden'>
          {icon}
        </span>
      {label}
    </li>
  )
  
}