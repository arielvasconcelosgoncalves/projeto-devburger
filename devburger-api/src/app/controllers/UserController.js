/*
* store => Cadastrar / Adicionar
* index => Listar vários
* show => Listar um único
* update => Atualizar
* delete => Deletar / Remover

*/

import { Op } from "sequelize";
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
      cpf: Yup.string()
        .required()
        .matches(/^\d{11}$/, "CPF deve conter exatamente 11 números"),
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

    const { name, email, password, admin, cpf } = request.body;

    const userExists = await User.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }],
      },
    });

    //console.log(userExists);

    if (userExists) {
      return response.status(409).json({ error: "Usuário ou CPF já cadastrados." });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
      cpf,
    });
    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      cpf: user.cpf,
    });
  }
}

export default new UserController();
