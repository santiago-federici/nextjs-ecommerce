import { SortDropdown } from "./SortDropdown"
import { FiltersAside } from "./FiltersAside"


export function Filters () {
  return (
    <section className="mt-16 flex lg:hidden justify-between relative">
      <SortDropdown />
      
      <FiltersAside />
    </section>
  )
}