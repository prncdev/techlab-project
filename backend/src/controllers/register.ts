import { RequestHandler } from "express";
import bcrypt from 'bcryptjs';
import Users from "../models/Users";
import { GenerateToken } from "../config/tokenGen";

export const Register: RequestHandler = async function(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check for required fields
    if(!name || !email || !password) {
      res.status(400);
      throw new Error('User details are required');
    }

    // check if email is already there.
    if(await Users.findOne({email})) {
      res.status(400);
      throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({ name, email, password: hashedPassword });

    res.status(201).json({
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