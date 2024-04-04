export function Button ({ as, text, extraClassName }: { as: string, text: string, extraClassName?: string }) {

  const defeaultButtonStyle = 'p-[--btn-padding] rounded text-white font-bold'
  
  const primaryButtonStyle = 'bg-black font-medium'
  const ghostButtonStyle = 'bg-transparent border border-[2px] border-[--clr-secondary] font-bold'
  
  return (
    <button className={`${defeaultButtonStyle} ${as === 'primary' ? primaryButtonStyle : ghostButtonStyle} ${extraClassName}`}>{text}</button>
  )
}