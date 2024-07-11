import { IRouter, Router } from 'express';
import { Register } from '../controllers/register';
import { login } from '../controllers/login';
import Profile from '../controllers/profile';
import { authorizeHandler } from '../middlewares/authorizeHandler';

const Routes: IRouter = Router();

Routes.post('/register',Register);

Routes.post('/login', login);

Routes.get('/me', authorizeHandler, Profile);

Routes.route('/:id').put(/* Fn to update field */).delete(/* Fn to delete a project */);

export default Routes;