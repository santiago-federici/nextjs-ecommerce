export function ThemeSwtich () {
  return (
    <div className='flex gap-4 items-center'>
      <span>light</span>  
      <input type="checkbox" className="toggle" id='toggle' />
      <span>dark</span>
    </div>
  )
}