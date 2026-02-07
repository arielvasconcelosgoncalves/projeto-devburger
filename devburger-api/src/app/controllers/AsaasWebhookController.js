import Order from "../schemas/Order.js";

class AsaasWebhookController {
  async handle(req, res) {
    try {
      console.log("🔔 Webhook recebido:", JSON.stringify(req.body, null, 2));

      const { event, payment } = req.body;

      if (!payment || !payment.id) {
        console.log("❌ Webhook sem payment.id");
        return res.status(400).json({ error: "Invalid payload" });
      }

      if (
        event === "PAYMENT_CONFIRMED" ||
        event === "PAYMENT_RECEIVED" ||
        event === "PAYMENT_UPDATED"
      ) {
        const order = await Order.findOneAndUpdate(
          { paymentId: payment.id },
          {
            paid: true,
            status: "paid",
          },
          { new: true }
        );

        if (!order) {
          console.log("❌ Pedido não encontrado para paymentId:", payment.id);
        } else {
          console.log("✅ Pedido atualizado como pago:", order._id);
        }
      }

      return res.status(200).json({ received: true });
    } catch (error) {
      console.error("🔥 Erro no webhook:", error);
      return res.status(500).json({ error: "Webhook error" });
    }
  }
}

export default new AsaasWebhookController();
