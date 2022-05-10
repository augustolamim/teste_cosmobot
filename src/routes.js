import { Router } from 'express';

//Controllers
import UserController from './app/controllers/UserController';
import GroupController from './app/controllers/GroupController';

//Validation middleware & schemas
import validator from './app/middlewares/validator';
import * as schemas from './schema';

const routes = new Router();

//Users routes
routes.get('/users', UserController.index);
routes.put('/users/:userId', validator(schemas.updateUserSchema),UserController.update);
routes.post('/users', validator(schemas.createUserSchema), UserController.store);
routes.delete('/users/:userId', UserController.delete);

//Groups routes
routes.get('/groups', GroupController.index);



export default routes;