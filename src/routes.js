import { Router } from 'express';

//Controllers
import UserController from './app/controllers/UserController';
import GroupController from './app/controllers/GroupController';

//Validation middleware & schemas
import validator from './app/middlewares/validator';
import * as schemas from './schema';

//swagger api documentation
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const routes = new Router();

//Users routes
routes.get('/users', UserController.index);
routes.put('/users/:userId', validator(schemas.updateUserSchema),UserController.update);
routes.post('/users', validator(schemas.createUserSchema), UserController.store);
routes.delete('/users/:userId', UserController.delete);

//Groups routes
routes.get('/groups', GroupController.index);

//Api documentation
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


export default routes;