import Image from "next/image"
import Link from "next/link"

import { Wrapper } from "@components/Wrapper"
import { SortDropdown } from "@components/ProductsPage/SortDropdown"
import { FiltersComponent } from "@components/ProductsPage/FiltersComponent"
import { ArrowRight } from "@components/Icons"
import { Card } from "@components/Card"

import '@styles/ProductsPage.css'

import prods from '@mocks/prods.json'

export default function ProductsPage () {

  return(
    <Wrapper>

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


      <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-4 mt-16">
        <section className="mb-10 lg:mb-0 max-lg:flex justify-between lg:justify-start relative">
          <SortDropdown />
          
          <FiltersComponent />
        </section>

        <div className="grid custom-grid gap-4">
          {prods.map((prod, index) => (
            <Card
              key={index}
              id={prod.id}
            />
          ))}
        </div>
      </section>
    </Wrapper>
  )
} 