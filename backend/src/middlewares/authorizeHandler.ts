import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

export const authorizeHandler: RequestHandler = async function (req, res: any, next) {
  try {
    let token: string = '';

    // Check if headers contains a token.
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      // verifying the token.
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Getting the user by the token from DB.
      res.user = await Users.findById(decoded.id).select('-password');
      
      next();
    } else {
      res.status(401);
      throw new Error('Unauthorized, no token');
    }

  } catch (error) {
    next(error);
  }
}