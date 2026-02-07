import asaasApi from "../services/asaas.js";
import Order from "../schemas/Order.js";

class GetPixQrCodeController {
  async show(req, res) {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order || !order.paymentId) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    try {
      const response = await asaasApi.get(`/payments/${order.paymentId}/pixQrCode`);

      return res.json({
        qrCode: response.data.encodedImage,
        payload: response.data.payload,
        expirationDate: response.data.expirationDate,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);

      return res.status(500).json({
        error: "Erro ao buscar QR Code PIX",
      });
    }
  }
}

export default new GetPixQrCodeController();
