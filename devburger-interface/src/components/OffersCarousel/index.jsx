import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Title } from "./styles.js";
import { CartProducts } from "../CartProducts/index.jsx";

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products");

      const onlyOffers = data.filter((product) => product.offer);
      setOffers(onlyOffers);
    }
    loadProducts();
  }, []);
  

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1200, min: 690 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-items"
      >
        {offers.map((product) => (
          <CartProducts key={product.id} product={product} />
        ))}
      </Carousel>
    </Container>
  );
}
