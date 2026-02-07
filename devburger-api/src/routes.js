import { Router } from "express";
import UserController from "./app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multer from "multer";
import multerConfig from "./config/multer.js";
import authMiddleware from "./app/middlewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/CreatePaymentIntentController.js";
import CreatePixPaymentController from "./app/controllers/CreatePixPaymentController.js";
import GetPixQrCodeController from "./app/controllers/GetPixQrCodeController.js";
import AsaasWebhookController from "./app/controllers/AsaasWebhookController.js";
import OrderStatusController from "./app/controllers/OrderStatusController.js";

const routes = new Router();

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);
routes.get("/webhooks/asaas", (req, res) => {
  return res.json({ status: "Webhook online" });
});
routes.post("/webhooks/asaas", AsaasWebhookController.handle);

routes.use(authMiddleware);

routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

routes.post("/create-payment-intent", CreatePaymentIntentController.store);

routes.post("/payments/pix", CreatePixPaymentController.store);
routes.get("/payments/pix/qrcode/:orderId", GetPixQrCodeController.show);
routes.get("/orders/:orderId/status", OrderStatusController.show);

export default routes;

// request --> middleware --> controller --> model --> database --> response
