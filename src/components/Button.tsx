export function Button ({ as, text, extraClassName }: { as: string, text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'p-btn-padding rounded font-bold'
  
  const primaryButtonStyle = 'text-inverted bg-primary font-medium'
  const ghostButtonStyle = 'text-inverted bg-transparent border-secondary border border-[2px]'
  const buttonStyle = as === 'primary' ? primaryButtonStyle : ghostButtonStyle
  
  return (
    <button className={`${defeaultButtonStyle} ${buttonStyle} ${extraClassName}`}>{text}</button>
  )
}