export function NavItem ({ icon, label} : {icon: React.ReactNode, label: string}) {

  return(
    <li className='font-medium flex gap-2 items-center hover:text-accent cursor-pointer transition duration-200'>
        <span className='md:hidden'>
          {icon}
        </span>
      {label}
    </li>
  )
  
}