import { Cart } from "@components/Icons";

export function CartModal ({ cartId }: { cartId: string }) {
  return(
    <>
      <label htmlFor={cartId} className='cart-icon cursor-pointer hover:text-accent'>
        <Cart />
      </label>

      <input type="checkbox" hidden id={cartId} />

      <aside className='cart absolute top-16'>
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