import { RequestHandler } from "express";
import bcrypt from 'bcryptjs';
import Users from "../models/Users";
import { GenerateToken } from "../config/tokenGen";

export const login: RequestHandler = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // check fields not empty.
    if (!email || !password) {
      res.status(400);
      throw new Error('User credentials are required');
    }

    const user = await Users.findOne({ email });

    // Check user credentials.
    if(!user || !(await bcrypt.compare(password, user.password))) {
      res.status(404);
      throw new Error('Invalid credentials');
    }

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: GenerateToken(user.id)
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}