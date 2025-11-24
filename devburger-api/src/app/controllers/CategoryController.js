import * as Yup from "yup";
import Category from "../models/Category.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
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

    const { file } = request;
    if (!file) {
      return response.status(400).json({ error: "Image is required" });
    }

    const { name } = request.body;

    const categoryExists = await Category.findOne({ where: { name } });
    if (categoryExists) {
      return response.status(400).json({ error: "Category already exists" });
    }

    // 🔥 Upload no Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: "categories",
    });

    // Remove a imagem temporária
    fs.unlinkSync(file.path);

    const { id } = await Category.create({
      name,
      path: uploadedImage.secure_url, // 🔥 Guarda só a URL
    });

    return response.status(201).json({ id, name });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
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

    const { id } = request.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return response.status(400).json({ message: "Make sure your category ID is correct" });
    }

    let path = category.path;
    const { file } = request;

    if (file) {
      const uploadedImage = await cloudinary.uploader.upload(file.path, {
        folder: "categories",
      });

      fs.unlinkSync(file.path);

      path = uploadedImage.secure_url; // 🔥 Atualiza apenas a URL
    }

    const { name } = request.body;

    // Verifica se o novo nome já existe (se quiser mudar o nome)
    if (name) {
      const categoryNameExists = await Category.findOne({ where: { name } });

      if (categoryNameExists && categoryNameExists.id !== +id) {
        return response.status(400).json({ error: "Category already exists" });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: { id },
      }
    );

    return response.status(200).json({ message: "Category updated successfully" });
  }

  async index(request, response) {
    const category = await Category.findAll();
    return response.json(category);
  }
}

export default new CategoryController();
