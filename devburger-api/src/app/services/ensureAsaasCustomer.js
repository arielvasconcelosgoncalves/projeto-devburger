import asaasApi from "./asaas.js";
import User from "../models/User.js";

export default async function ensureAsaasCustomer(user) {
  const cpfCnpj = user.cpf.replace(/\D/g, "");

  // 1️⃣ Se já existe customer
  if (user.asaasCustomerId) {
    try {
      // 2️⃣ Buscar customer na Asaas
      const customer = await asaasApi.get(`/customers/${user.asaasCustomerId}`);

      // 3️⃣ Se NÃO tiver CPF, atualizar
      if (!customer.data.cpfCnpj) {
        await asaasApi.put(`/customers/${user.asaasCustomerId}`, {
          cpfCnpj,
        });
      }

      return user.asaasCustomerId;
    } catch (err) {
      // Se customer não existir mais na Asaas, cai para recriar
      console.warn("Customer inválido na Asaas, recriando...");
    }
  }

  // 4️⃣ Criar customer do zero
  const response = await asaasApi.post("/customers", {
    name: user.name,
    email: user.email,
    cpfCnpj,
  });

  const customerId = response.data.id;

  // 5️⃣ Salvar no banco
  await User.update({ asaasCustomerId: customerId }, { where: { id: user.id } });

  return customerId;
}
