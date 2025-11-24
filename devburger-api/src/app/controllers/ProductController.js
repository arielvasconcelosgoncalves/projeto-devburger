import * as Yup from "yup";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const imageURL = request.file?.path;

    const { name, price, category_id, offer } = request.body;

    try {
      const product = await Product.create({
        name,
        price,
        category_id,
        path: imageURL,
        offer,
      });

      return response.status(201).json(product);
    } catch (error) {
      return response.status(500).json({ error: "Internal error", details: error.message });
    }
  }

  async update(request, response) {
    console.log("===== 📌 PRODUCT UPDATE =====");
    console.log("BODY:", request.body);
    console.log("FILE:", request.file);

    try {
      // Convertendo tipos manualmente
      if (request.body.price) {
        request.body.price = Number(request.body.price);
      }

      if (request.body.category_id) {
        request.body.category_id = Number(request.body.category_id);
      }

      if (request.body.offer === "true") request.body.offer = true;
      if (request.body.offer === "false") request.body.offer = false;

      const schema = Yup.object({
        name: Yup.string(),
        price: Yup.number(),
        category_id: Yup.number(),
        offer: Yup.boolean(),
      });

      schema.validateSync(request.body, { abortEarly: false });

      const { admin: isAdmin } = await User.findByPk(request.userId);
      if (!isAdmin) {
        return response.status(401).json({ error: "not authorized" });
      }

      const { id } = request.params;
      const findProduct = await Product.findByPk(id);

      if (!findProduct) {
        return response.status(400).json({ error: "Invalid product ID" });
      }

      await findProduct.update({
        name: request.body.name ?? findProduct.name,
        price: request.body.price ?? findProduct.price,
        category_id: request.body.category_id ?? findProduct.category_id,
        offer: request.body.offer ?? findProduct.offer,
        ...(request.file && { path: request.file.path }),
      });

      return response.json({ message: "updated successfully" });
    } catch (error) {
      console.log("🔥 UPDATE ERROR:", error);

      return response.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async index(request, response) {
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

      return response.json(products);
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new ProductController();
