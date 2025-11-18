import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Title, ContainerItems, CategoryButton } from "./styles.js";

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
      setCategories(data);
    }
    loadCategories();
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
      <Title>Categorias</Title>
      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-items"
      >
        {categories.map((category) => (
          <ContainerItems key={category.id} imageUrl={category.url}>
            <CategoryButton to={`/menu?categoryId=${category.id}`}>
              {category.name}
            </CategoryButton>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
