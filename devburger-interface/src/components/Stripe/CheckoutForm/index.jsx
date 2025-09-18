import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles.css";
import { useCart } from "../../../hooks/CartContext";
import { toast } from "react-toastify";
import { api } from "../../../services/api";

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const {
    // eslint-disable-next-line no-unused-vars
    state: { dpmCheckerLink },
  } = useLocation();
  const { cartProducts, clearCart } = useCart();

  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe ou Elementos com falha, tente novamente");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const products = cartProducts.map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });
        const { status } = await api.post(
          "/orders",
          { products },
          {
            validateStatus: () => true,
          }
        );
        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(
              `/complete-payment?payment_intent_client_secret=${paymentIntent.client_secret}`
            );
            toast.success("Pedido Realizado com Sucesso!");
          }, 3000);
          clearCart();
        } else if (status === 409) {
          toast.error("Erro ao tentar realizar o pedido!");
        } else {
          throw new Error();
        }
        console.log(status);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Falha no Sistema! Tente novamente!");
      }
    } else {
      navigate(
        `/complete-payment?payment_intent_client_secret=${paymentIntent.client_secret}`
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pagar Agora"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
