export function Button ({ as, icon, text, className }: { as?: string, icon?: JSX.Element ,text: string, className?: string }) {

  const defeaultButtonStyle = 'font-medium uppercase text-sm md:text-md px-4 py-2 rounded-md relative transition duration-200'
  
  const filledButton = 'bg-secondary text-white border border-secondary hover:opacity-70'
  const outlineButton = 'bg-transparent text-secondary border border-secondary'
  const buttonStyle = as && as === 'filled' ? filledButton : outlineButton
  
  return (
    <button className={`${defeaultButtonStyle} ${buttonStyle} ${className}`}>{icon}{text}</button>
  )
}