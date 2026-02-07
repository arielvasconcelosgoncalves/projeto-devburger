import asaasApi from "../services/asaas.js";
import Order from "../schemas/Order.js";
import User from "../models/User.js";
import ensureAsaasCustomer from "../services/ensureAsaasCustomer.js";

class CreatePixPaymentController {
  async store(req, res) {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    if (order.paid) {
      return res.status(400).json({ error: "Pedido já está pago" });
    }

    // 1️⃣ Buscar usuário real no Postgres
    const user = await User.findByPk(order.user.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    try {
      // 2️⃣ Garantir customer na Asaas
      const customerId = await ensureAsaasCustomer(user);

      // 3️⃣ Atualizar pedido com o customerId (opcional, mas recomendado)
      order.user.asaasCustomerId = customerId;
      await order.save();

      const response = await asaasApi.post("/payments", {
        billingType: "PIX",
        value: order.total,
        description: `Pedido #${order._id} - DevBurger`,
        customer: customerId,
        dueDate: new Date().toISOString().split("T")[0],
      });

      order.paymentId = response.data.id;
      await order.save();

      return res.json({
        paymentId: response.data.id,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);

      return res.status(500).json({
        error: "Erro ao criar pagamento PIX",
      });
    }
  }
}

export default new CreatePixPaymentController();
