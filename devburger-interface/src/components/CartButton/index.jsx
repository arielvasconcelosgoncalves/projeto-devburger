import Cart from "../../assets/img/Cart.svg";
import { useCart } from "../../hooks/CartContext";
import { ContainerButton, ButtonGroup } from "./styles";

export function CartButton({ product, ...props }) {
  const { cartProducts, decreaseProduct, increaseProduct } = useCart();
  const productInCart = cartProducts.find((item) => item.id === product.id);

  return (
    <>
      {!productInCart ? (
        <ContainerButton {...props}>
          <img src={Cart} />
        </ContainerButton>
      ) : (
        <ButtonGroup>
          <div>
            <button onClick={() => decreaseProduct(product.id)}>-</button>
            <h3>{productInCart.quantity}</h3>
            <button onClick={() => increaseProduct(product.id)}>+</button>
          </div>
        </ButtonGroup>
      )}
    </>
  );
}
