import { Card } from "./Card";

export function Carousel () {
  return (
    <div className="carousel rounded-box w-full gap-4 md:gap-8">
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div> 
      <div className="carousel-item">
        <Card prodName="Gafas Aviador Cuero 2" price="5000" />
      </div>
    </div>
  )
}