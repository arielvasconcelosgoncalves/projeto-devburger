import { Container } from "./styles.js";
import { Button } from "../Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/CartContext.jsx";
import { api } from "../../services/api.js";
import { formatPrice } from "../../utils/formatPrice.js";
import { useNavigate } from "react-router-dom";

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(500);
  const { cartProducts } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setFinalPrice(sumAllItems);
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      };
    });

    try {
      const { data } = await api.post("/create-payment-intent", { products });
      navigate("/checkout", { state: data });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Erro, tente novamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    // try {
    //   const { status } = await api.post(
    //     "/orders",
    //     { products },
    //     {
    //       validateStatus: () => true,
    //     }
    //   );

    //   if (status === 200 || status === 201) {
    //     setTimeout(() => {
    //       navigate("/");
    //       clearCart();
    //     }, 2000);

    //     toast.success("Pedido Realizado com Sucesso!");
    //   } else if (status === 409) {
    //     toast.error("Erro ao tentar realizar o pedido!");
    //   } else {
    //     throw new Error();
    //   }

    //   console.log(status);
    //   // eslint-disable-next-line no-unused-vars
    // } catch (error) {
    //   toast.error("Falha no Sistema! Tente novamente!");
    // }
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo de Pedido</h2>
          <p className="itens">Itens</p>
          <p className="itens-price">{formatPrice(finalPrice)}</p>
          <p className="deliver-tax">Taxa de Entrega</p>
          <p className="deliver-tax-price">{formatPrice(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>

      <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  );
}
