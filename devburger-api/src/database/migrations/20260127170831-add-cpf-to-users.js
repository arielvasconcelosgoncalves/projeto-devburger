export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "cpf", {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  });
}
export async function down(queryInterface) {
  await queryInterface.removeColumn("users", "cpf");
}
