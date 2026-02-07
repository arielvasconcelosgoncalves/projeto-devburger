export async function up(queryInterface) {
  await queryInterface.renameColumn(
    "users", // nome da tabela
    "asaasCustomerId", // nome ATUAL da coluna
    "asaas_customer_id" // novo nome
  );
}

export async function down(queryInterface) {
  await queryInterface.renameColumn("users", "asaas_customer_id", "asaasCustomerId");
}
