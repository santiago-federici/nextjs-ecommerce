export function Button ({ as, text, extraClassName }: { as: string, text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'text-inverted font-medium uppercase text-sm md:text-md p-btn-padding rounded-sm transition duration-200'
  
  const primaryButtonStyle = 'bg-secondary border border-secondary hover:opacity-70'
  const ghostButtonStyle = 'bg-transparent border border-primary hover:bg-primary hover:text-secondary'
  const buttonStyle = as === 'primary' ? primaryButtonStyle : ghostButtonStyle
  
  return (
    <button className={`${defeaultButtonStyle} ${buttonStyle} ${extraClassName}`}>{text}</button>
  )
}