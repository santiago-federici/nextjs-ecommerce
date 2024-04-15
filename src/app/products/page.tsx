import Image from "next/image"
import Link from "next/link"

import { SortDropdown } from "@components/ProductsPage/SortDropdown"
import { FiltersAside } from "@components/ProductsPage/FiltersAside"
import { ArrowRight } from "@components/Icons"

export default function ProductsPage () {

  return(
    <div className='wrapper pt-[120px] pb-[200px]'>

      {/* TODO: create breadcrumbs component with all the logic */}
      <div className="text-gray-500 text-sm mb-10 flex gap-1">
        <Link href={'/'}>Homepage</Link>
        <ArrowRight />      
        <p>Products</p>
      </div>

      <section className="grid lg:flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <h2 className="text-6xl">Shirts</h2>
          <p className="text-text text-sm">20 results</p>
        </div>

        <Image src={'/prodsHeader.png'} width={900} height={150} alt={'prodsHeader'} className="w-full lg:w-2/3" />
      </section>

      <section className="mt-16 flex lg:hidden justify-between relative">
        <SortDropdown />
        
        <FiltersAside />
      </section>
    </div>
  )
} 