export function Button ({ as, text, extraClassName }: { as: string, text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'px-4 py-1 max-sm:text-sm md:p-btn-padding rounded font-bold transition duration-200'
  
  const primaryButtonStyle = 'text-inverted bg-primary font-medium hover:opacity-80'
  const ghostButtonStyle = 'text-inverted bg-transparent border-secondary border border-[2px] hover:bg-primary hover:border-primary hover:text-inverted'
  const buttonStyle = as === 'primary' ? primaryButtonStyle : ghostButtonStyle
  
  return (
    <button className={`${defeaultButtonStyle} ${buttonStyle} ${extraClassName}`}>{text}</button>
  )
}