export function Button ({ as, text, extraClassName }: { as: string, text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'p-btn-padding rounded text-white font-bold'
  
  const primaryButtonStyle = 'bg-primary font-medium'
  const ghostButtonStyle = 'bg-transparent border-secondary font-bold border border-[2px]'
  
  return (
    <button className={`${defeaultButtonStyle} ${as === 'primary' ? primaryButtonStyle : ghostButtonStyle} ${extraClassName}`}>{text}</button>
  )
}