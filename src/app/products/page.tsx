import { Button } from "@components/CustomButtons";
import { Filter, Search } from "@components/Icons";
import Image from "next/image";

export default function ProductsPage () {
  return(
    <div className='wrapper pt-[120px] pb-[200px]'>

      <p className="text-gray-500 text-sm mb-10">Homepage / Products</p>

      {/* ProductsHeader */}
      <section className="grid lg:flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <h2 className="text-6xl">Shirts</h2>
          <p className="text-text text-sm">20 results</p>
        </div>

        <Image src={'/prodsHeader.png'} width={900} height={150} alt={'prodsHeader'} className="w-full lg:w-2/3" />
      </section>

      {/* Filters */}
      <section className="mt-10 flex justify-between">
        <Button as="ghost" text="Filters" icon={<Filter />} extraClassName="flex gap-2 border-secondary text-secondary" />

        <Button as="ghost" text="Search" icon={<Search />} extraClassName="flex gap-2 border-secondary text-secondary" />
      </section>

    </div>
  )
}