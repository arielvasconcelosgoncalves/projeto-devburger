/*
* store => Cadastrar / Adicionar
* index => Listar vários
* show => Listar um único
* update => Atualizar
* delete => Deletar / Remover

*/

import User from "../models/User.js";
import { v4 } from "uuid";
import * as Yup from "yup";

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    /*const isValid = await schema.isValid(request.body);

    if (!isValid) {
      return response.status(400).json({ error: "Make sure the datas are correct!" });
    }*/

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const userExists = await User.findOne({ where: { email } });

    console.log(userExists);

    if (userExists) {
      return response.status(409).json({ error: "User already exists." });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    });
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
