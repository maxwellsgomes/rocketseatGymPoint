import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/* Rotas */
routes.post('/users', authMiddleware, UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/students', authMiddleware, StudentsController.store);
routes.put('/students', authMiddleware, StudentsController.update);
routes.put('/users', authMiddleware, UserController.update);

export default routes;
