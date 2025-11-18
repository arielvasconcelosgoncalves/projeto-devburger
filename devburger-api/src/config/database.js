import "dotenv/config.js";

export default {
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  define: {
    underscored: true,
    underscoredAll: true,
    timestamps: true,
    freezeTableName: false,
  },
};
