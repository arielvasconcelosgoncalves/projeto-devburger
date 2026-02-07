import PropTypes from "prop-types";
import { CardImage, Container, CardDiv } from "./styles";
import { CartButton } from "../CartButton/index";
import { formatPrice } from "../../utils/formatPrice.js";
import { useCart } from "../../hooks/CartContext.jsx";

export function CartProducts({ product }) {
  const { putProductInCart } = useCart();

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <CardDiv>
        <p>{product.name}</p>
        <strong>{formatPrice(product.price)}</strong>
      </CardDiv>
      <CartButton product={product} onClick={() => putProductInCart(product)} />
    </Container>
  );
}

CartProducts.propTypes = {
  product: PropTypes.object,
};
