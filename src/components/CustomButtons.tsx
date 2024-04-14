export function Button ({ as, icon, text, extraClassName }: { as: string, icon?: JSX.Element ,text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'text-inverted font-medium uppercase text-sm md:text-md p-btn-padding rounded-sm transition duration-200'
  
  const primaryButtonStyle = 'bg-secondary border border-secondary hover:opacity-70'
  const ghostButtonStyle = 'bg-transparent border border-primary relative z-10 ghost-btn-hover'
  const buttonStyle = as === 'primary' ? primaryButtonStyle : ghostButtonStyle
  
  return (
    <button className={`${defeaultButtonStyle} ${buttonStyle} ${extraClassName}`}>{icon}{text}</button>
  )
}