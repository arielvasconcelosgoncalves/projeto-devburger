export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn("users", "cpf", {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn("users", "cpf", {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  });
}
