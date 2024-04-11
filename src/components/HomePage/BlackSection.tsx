import Image from "next/image"

const winterCollectionProds = [
  {
    image: '/NikeSB.webp',
    alt: 'Product image',
    category: 'SB'
  },
  {
    image: '/NikeDri-FIT.webp',
    alt: 'Product image',
    category: 'Dri-FIT'
  },
  {
    image: '/JordanJumpman.webp',
    alt: 'Product image',
    category: 'Jordan'
  }
]

export function BlackSection () {
  return(
    <section className="bg-secondary w-full h-fit">
      <div className='wrapper grid lg:flex gap-10 lg:gap-6 justify-between py-24 lg:py-32'>
        <div className="flow lg:max-w-sm xl:max-w-xl">
          <h3 className="text-white">CHECK OUT OUR WINTER COLLECTION</h3>
          <p className="text-gray-300">Winter Collections — New Modern Design</p>
          <p className="text-gray-300">We’ve gathered the latest models for you to consider adding to your winter lineup, check and see which ones can complete your wardrobe this season.</p>
        </div>

        <ul className="grid lg:flex gap-4 w-full">
          {
            winterCollectionProds.map((prod, index) => (
              <li key={index} className="relative overflow-hidden group">
                <Image
                  src={prod.image}
                  alt={prod.alt}
                  width={500}
                  height={0}
                  className="w-full h-[300px] mg:h-[350px] lg:h-[400px] object-cover opacity-75 cursor-pointer group-hover:opacity-85 group-hover:scale-110 transition duration-500"
                />


                <p className="absolute text-white font-bold bottom-0 right-2 cursor-pointer custom-underline">Discover</p>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}