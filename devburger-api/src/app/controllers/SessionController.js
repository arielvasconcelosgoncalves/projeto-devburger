import * as Yup from "yup";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.js";

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body);

    const emailOrPasswordIsIncorrect = () => {
      return response.status(401).json({ error: "Make sure the datas are correct!" });
    };
    if (!isValid) {
      emailOrPasswordIsIncorrect();
    }

    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      emailOrPasswordIsIncorrect();
    }
    const isSamePassword = await user.comparePassword(password);
    if (!isSamePassword) {
      emailOrPasswordIsIncorrect();
    }

    return response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresId,
      }),
    });
  }
}

export default new SessionController();
