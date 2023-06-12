import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../Models/auth.js";

// Signup

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ mesage: "user alredy exits" });
    }

    const hashedpassword = await bcrypt.hash(password, 123);
    const newUser = await users.create({
      name,
      email,
      password: hashedpassword,
    });
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test", {
      expiresIn: "1hr",
    });
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ mesage: "user dont  exits" });
    }

    const isPassword = await bcrypt.compare(password, existinguser.password);
    if (!isPassword) {
      return res.status(400).json({ mesage: "Invalid credential" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      "test",
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};
