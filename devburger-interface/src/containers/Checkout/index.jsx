import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import { CheckoutForm } from "../../components";
import { ButtonPayment, OptionsDiv, Title, Container } from "./styles";
import { useState } from "react";
import { PixCheckout } from "../../components/PixCheckout";

export function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    state: { clientSecret },
  } = useLocation();
  if (!clientSecret) {
    return <div>Erro, volte e tente novamente</div>;
  }
  return (
    <>
      {paymentMethod === "Cartão" ? (
        <Container>
          <Title>Você escolheu pagar com {paymentMethod}</Title>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </Container>
      ) : paymentMethod === "Pix" ? (
        <Container>
          <Title>Você escolheu pagar com {paymentMethod}</Title>
          <PixCheckout />
        </Container>
      ) : (
        <OptionsDiv>
          <ButtonPayment onClick={() => setPaymentMethod("Cartão")}>
            Pagar com o Cartão
          </ButtonPayment>
          <ButtonPayment onClick={() => setPaymentMethod("Pix")}>
            Pagar com Pix
          </ButtonPayment>
        </OptionsDiv>
      )}
    </>
  );
}
