import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

class ProductController {
  async store(request, response) {
    console.log("📌 STORE PRODUCT CALLED");
    console.log("BODY:", request.body);
    console.log("FILE:", request.file);

    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      console.log("❌ VALIDATION ERROR:", err);
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    console.log("IS ADMIN?", isAdmin);

    if (!isAdmin) {
      console.log("❌ BLOCKED: NOT ADMIN");
      return response.status(401).json();
    }

    console.log("REQUEST.FILE.PATH:", request.file?.path);

    const imageURL = request.file?.path;
    if (!imageURL) {
      console.log("❌ ERROR: No image uploaded");
    }

    const { name, price, category_id, offer } = request.body;

    try {
      const product = await Product.create({
        name,
        price,
        category_id,
        path: imageURL,
        offer,
      });

      console.log("✅ PRODUCT CREATED:", product);

      return response.status(201).json(product);
    } catch (error) {
      console.log("🔥 ERROR CREATING PRODUCT:", error);
      return response.status(500).json({ error: "Internal error", details: error.message });
    }
  }

  async update(request, response) {
    if (request.body.offer === "true") request.body.offer = true;
    if (request.body.offer === "false") request.body.offer = false;

    console.log("📌 UPDATE PRODUCT CALLED");
    console.log("BODY RECEIVED:", request.body);
    console.log("FILE RECEIVED:", request.file);

    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      console.log("❌ VALIDATION ERROR:", err);
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);
    console.log("IS ADMIN?", isAdmin);

    if (!isAdmin) {
      console.log("❌ BLOCKED: NOT ADMIN");
      return response.status(401).json();
    }

    const { id } = request.params;
    console.log("PRODUCT ID:", id);

    const findProduct = await Product.findByPk(id);
    console.log("PRODUCT FOUND:", findProduct);

    if (!findProduct) {
      console.log("❌ PRODUCT NOT FOUND");
      return response.status(400).json({ error: "make sure your product ID is correct" });
    }

    const { name, price, category_id, offer } = request.body;

    try {
      const updatePayload = {
        name,
        price,
        category_id,
        offer,
        ...(request.file && { path: request.file.path }),
      };

      console.log("UPDATE PAYLOAD:", updatePayload);

      await findProduct.update(updatePayload);

      console.log("✅ PRODUCT UPDATED SUCCESSFULLY");

      return response.status(200).json({ message: "update successfully" });
    } catch (error) {
      console.log("🔥 UPDATE ERROR:", error);
      return response.status(500).json({ error: "Internal error", details: error.message });
    }
  }

  async index(request, response) {
    console.log("📌 GET /products");

    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name"],
          },
        ],
      });

      console.log("PRODUCTS RETURNED:", products.length);

      return response.json(products);
    } catch (error) {
      console.log("🔥 ERROR FETCHING PRODUCTS:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProductController();
