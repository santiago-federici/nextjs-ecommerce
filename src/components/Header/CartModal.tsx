import { Cart } from "@components/Icons";

export function CartModal ({ cartId }: { cartId: string }) {
  return(
    <>
      <label htmlFor={cartId} className='text-white cart-icon cursor-pointer hover:text-accent transitoin duration-200'>
        <Cart />
      </label>

      <input type="checkbox" hidden id={cartId} />

      <aside className='cart absolute top-16 w-fit p-4 text-nowrap shadow-lg'>
        <ul>
          <li>Product One</li>
          <li>Product Two</li>
          <li>Product Three</li>
          <li>Product Four</li>
        </ul>
      </aside>
    </>
  )
}