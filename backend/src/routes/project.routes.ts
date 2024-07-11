import { IRouter, Router } from 'express';
import { AddProject } from '../controllers/addProject';
import { authorizeHandler } from '../middlewares/authorizeHandler';
import { GetProject } from '../controllers/getProjects';
import { UpdateProject } from '../controllers/updateProject';

const Routes: IRouter = Router();

Routes.route('/').get(authorizeHandler, GetProject/* Fn to fetch project list */).post(authorizeHandler, AddProject);
Routes.route('/:id').put(authorizeHandler, UpdateProject).delete(/* Fn to delete a project */);

export default Routes;