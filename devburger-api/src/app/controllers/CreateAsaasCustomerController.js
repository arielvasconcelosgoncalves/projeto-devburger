import asaasApi from "../services/asaas.js";
import User from "../models/User.js"; // ajuste se o nome for diferente

class CreateAsaasCustomerController {
  async store(req, res) {
    const userId = req.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (user.asaasCustomerId) {
      return res.json({ customerId: user.asaasCustomerId });
    }

    try {
      const response = await asaasApi.post("/customers", {
        name: user.name,
        email: user.email,
        cpf: user.cpf, // precisa existir no cadastro
      });

      user.asaasCustomerId = response.data.id;
      await user.save();

      return res.json({ customerId: response.data.id });
    } catch (error) {
      console.error(error.response?.data || error.message);

      return res.status(500).json({
        error: "Erro ao criar customer na Asaas",
      });
    }
  }
}

export default new CreateAsaasCustomerController();
