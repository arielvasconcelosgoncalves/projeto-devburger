import { Banner, Container, Title, Content } from "./styles";
import Logo from "../../assets/img/logo.svg";
import { CartItems } from "../../components";
import { CartResume } from "../../components";

export function Cart() {
  return (
    <Container>
      <Banner>
        <img src={Logo} alt="logo-devburger" />
      </Banner>
      <Title>Checkout - Pedido</Title>
      <Content>
        <CartItems />
        <CartResume />
      </Content>
    </Container>
  );
}
