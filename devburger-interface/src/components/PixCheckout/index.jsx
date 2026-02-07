import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/CartContext";
import { useEffect } from "react";

export function PixCheckout() {
  const { cartProducts } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    if (!orderId || paymentConfirmed) return;

    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/orders/${orderId}/status`);

        if (response.data.paid) {
          toast.success("Pagamento confirmado!");
          setPaymentConfirmed(true);
          clearInterval(interval);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        console.error("Erro ao verificar status do pagamento");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, paymentConfirmed]);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);

      const products = cartProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      }));

      const response = await api.post("/orders", { products });

      setOrderId(response.data._id);

      toast.success("Pedido criado! Gerando Pix...");
    } catch {
      toast.error("Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePix = async () => {
    try {
      // 1️⃣ cria o pagamento
      await api.post("/payments/pix", { orderId });

      // 2️⃣ busca o QR Code
      const qrCodeResponse = await api.get(`/payments/pix/qrcode/${orderId}`);

      setPixData(qrCodeResponse.data);
    } catch {
      toast.error("Erro ao gerar PIX");
    }
  };
  return (
    <div>
      {!orderId ? (
        <button onClick={handleCreateOrder} disabled={loading}>
          {loading ? "Criando pedido..." : "Gerar Pix"}
        </button>
      ) : (
        <p>Pedido criado: {orderId}</p>
      )}
      {/* PASSO 2 — Pedido criado, gerar PIX */}
      {orderId && !pixData && (
        <>
          <button onClick={handleCreatePix}>Gerar QR Code PIX</button>
        </>
      )}

      {/* PASSO 3 — PIX gerado */}
      {pixData && (
        <div>
          <h3>Escaneie o QR Code</h3>

          <img
            src={`data:image/png;base64,${pixData.qrCode}`}
            alt="QR Code Pix"
            style={{ width: 250 }}
          />

          <p>Ou copie e cole:</p>

          <textarea
            readOnly
            value={pixData.payload}
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      )}
      {/* PASSO 4 — Pagamento confirmado */}
      {paymentConfirmed ? (
        <h2>✅ Pagamento confirmado com sucesso!</h2>
      ) : (
        <p>Aguardando confirmação do pagamento...</p>
      )}
    </div>
  );
}
