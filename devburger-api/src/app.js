import express from "express";
import cors from "cors";
import routes from "./routes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import "./database/index.js";

// Corrigir __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    // CORREÇÃO AQUI — usar __dirname do ESM
    this.app.use("/product-file", express.static(path.resolve(__dirname, "..", "uploads")));
    this.app.use("/category-file", express.static(path.resolve(__dirname, "..", "uploads")));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
