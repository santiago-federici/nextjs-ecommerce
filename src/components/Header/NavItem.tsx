export function NavItem ({ icon, label} : {icon: React.ReactNode, label: string}) {

  return(
    <li className='font-medium flex gap-2 hover:text-accent cursor-pointer transition duration-200 uppercase'>
        <span className='lg:hidden'>
          {icon}
        </span>
      {label}
    </li>
  )
  
}