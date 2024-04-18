import Image from "next/image"
import Link from "next/link"

import { Wrapper } from "@components/Wrapper"
import { SortDropdown } from "@components/ProductsPage/SortDropdown"
import { FiltersAside } from "@components/ProductsPage/FiltersAside"
import { ArrowRight } from "@components/Icons"
import { Card } from "@components/Card"

import '@styles/ProductsPage.css'

import prods from '@mocks/prods.json'

const filters = [
  {
    id: 1,
    name: "Categories",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "T-Shirts",
        value: "tshirts"
      },
      {
        name: "Hoodies",
        value: "hoodies"
      },
      {
        name: "Snickers",
        value: "snickers"
      },
      {
        name: "Joggers",
        value: "joggers"
      }
    ]
  },
  {
    id: 2,
    name: "Brands",
    options: [
      {
        name: "All",
        value: "all"
      },
      {
        name: "Adidas",
        value: "adidas"
      },
      {
        name: "Puma",
        value: "puma"
      },
      {
        name: "Reebok",
        value: "reebok"
      },
      {
        name: "Vans",
        value: "vans"
      }
    ]
  },
  {
    id: 3,
    name: "Price",
    options: [
      {
        name: "Under $10",
        value: "10"
      },
      {
        name: "$10 - $20",
        value: "10-20"
      },
      {
        name: "$20 - $30",
        value: "20-30"
      },
      {
        name: "$30 - $40",
        value: "30-40"
      },
      {
        name: "Over $40",
        value: "40"
      }
    ]
  },
  {
    id: 4,
    name: "Rating",
    options: [
      {
        name: "5 Stars",
        value: "5"
      },
      {
        name: "4 Stars",
        value: "4"
      },
      {
        name: "3 Stars",
        value: "3"
      },
      {
        name: "2 Stars",
        value: "2"
      },
    ]
  },
  {
    id: 5,
    name: "Discount",
    options: [
      {
        name: "Only discount",
        value: "discount"
      },
      {
        name: "No discount",
        value: "nodiscount"
      }
    ]
  }
]


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

      <section className="mt-16 flex lg:hidden justify-between relative">
        <SortDropdown />
        
        <FiltersAside />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-4 mt-16">
        <aside className="hidden lg:flex lg:flex-col gap-4">
          {
            filters.map((filter, index) => (
              <article key={index} className="p-4 bg-zinc-300 h-fit rounded-sm shadow-lg">
                <h3>{filter.name}</h3>
                <ul className="">
                  {
                    filter.options.map((option, index) => (
                      <li key={index} className="ml-2">
                        <label htmlFor="filter" className="flex gap-2">
                          <input type="checkbox" id="filter" />
                          <p>{option.name}</p>
                        </label>
                      </li>
                    ))
                  }
                </ul>
              </article> 
            ))
          }
        </aside>

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