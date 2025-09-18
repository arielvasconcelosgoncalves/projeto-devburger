import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
  Back,
} from "./styles.js";
import { useEffect, useState } from "react";
import { api } from "../../services/api.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { CartProducts } from "../../components/CartProducts/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export function Menu() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get("categoryId");
    if (categoryId) {
      return categoryId;
    }
    return 0;
  });

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
      const newCategory = [{ id: 0, name: "Todos" }, ...data];
      setCategories(newCategory);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get("/products");

      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter((product) => {
        return product.category_id === activeCategory;
      });

      setFilteredProducts(newFilteredProducts);
    }
  }, [products, activeCategory]);

  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI
          <span>Esse cardápio está irressistível</span>
        </h1>
      </Banner>
      <Back
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <CategoryMenu>
        {categories.map((category) => {
          return (
            <CategoryButton
              $isActiveCategory={category.id === activeCategory}
              onClick={() => {
                navigate(
                  {
                    pathname: "/menu",
                    search: `?categoryId=${category.id}`,
                  },
                  {
                    replace: true,
                  }
                );
                setActiveCategory(category.id);
              }}
              key={category.id}
            >
              {category.name}
            </CategoryButton>
          );
        })}
      </CategoryMenu>

      <ProductsContainer>
        {filteredProducts.map((product) => {
          return <CartProducts product={product} key={product.id} />;
        })}
      </ProductsContainer>
    </Container>
  );
}
