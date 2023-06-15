import { db } from "@/database";
import { User } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { jwt, validations } from "@/utils";

type Data =
  | { message: string }
  | { token: string; user: { email: string; name: string; role: string } };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);
    default:
      res.status(400).json({ message: "bad request" });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name = "",
    email = "",
    password = "",
  } = req.body as { email: string; password: string; name: string };

  if (name.length === 0) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  if (email.length === 0) {
    return res.status(400).json({ message: "El correo es obligatorio" });
  }

  if (password.length === 0) {
    return res.status(400).json({ message: "La contraseña es obligatoria" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe ser mas de 6 caracteres" });
  }

  if (name.length < 2) {
    return res
      .status(400)
      .json({ message: "El nombre debe ser mayor de 3 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "El correo no es valido!" });
  }

  await db.connect();
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Correo ya existe" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error, revisar logs",
    });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token, //jwt
    user: {
      email,
      role,
      name,
    },
  });
};
