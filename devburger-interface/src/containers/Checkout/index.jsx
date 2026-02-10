import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../config/stripeConfig";
import { CheckoutForm } from "../../components";
import { ButtonPayment, OptionsDiv, Title, Container } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { PixCheckout } from "../../components/PixCheckout";

export function Checkout() {
  const { state } = useLocation();
  const { products } = state || {};

  const [paymentMethod, setPaymentMethod] = useState("");
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    async function createPaymentIntent() {
      if (paymentMethod !== "Cartão") return;

      try {
        const { data } = await api.post("/create-payment-intent", {
          products,
        });

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Erro ao criar PaymentIntent", error);
      }
    }

    createPaymentIntent();
  }, [paymentMethod, products]);

  if (!products) {
    return <div>Erro, volte e tente novamente</div>;
  }

  return (
    <>
      {paymentMethod === "Cartão" && clientSecret ? (
        <Container>
          <Title>
            <span className="text">Você escolheu pagar com Cartão</span>
          </Title>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </Container>
      ) : paymentMethod === "Pix" ? (
        <Container>
          <Title>
            <span className="text">Você escolheu pagar com Pix</span>
          </Title>
          <PixCheckout products={products} />
        </Container>
      ) : (
        <OptionsDiv>
          <ButtonPayment onClick={() => setPaymentMethod("Cartão")}>
            Pagar com Cartão
          </ButtonPayment>
          <ButtonPayment onClick={() => setPaymentMethod("Pix")}>
            Pagar com Pix
          </ButtonPayment>
        </OptionsDiv>
      )}
    </>
  );
}
