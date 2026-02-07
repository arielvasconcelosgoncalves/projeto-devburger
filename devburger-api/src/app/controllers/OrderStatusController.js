import Order from "../schemas/Order.js";

class OrderStatusController {
  async show(req, res) {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    return res.json({
      paid: order.paid,
      status: order.status,
    });
  }
}

export default new OrderStatusController();
