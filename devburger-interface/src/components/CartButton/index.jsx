import Cart from "../../assets/img/Cart.svg";
import { ContainerButton } from "./styles";

export function CartButton({ ...props }) {
  return (
    <ContainerButton {...props}>
      <img src={Cart} />
    </ContainerButton>
  );
}
