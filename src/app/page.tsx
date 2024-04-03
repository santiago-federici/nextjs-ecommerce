// import Image from "next/image";

export default function Home() {
  return (
    <main className="wrapper grid">
      <section className="hero-section flex flex-col items-center md:items-start gap-12 bg-red-500">
        {/* <Image
          src={'/public/heroGlasses.png'}
          width={150} 
          height={150}
          alt="Hero image of glasses with green background"
        /> */}
        <h1 className="text-white text-center md:text-left text-pretty">Mejora tu estilo con nuestro productos</h1>

        <button className="ghost-btn">Ver productos</button>
      </section>
    </main>
  );
}
