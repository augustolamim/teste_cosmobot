"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

//Controllers
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _GroupController = require('./app/controllers/GroupController'); var _GroupController2 = _interopRequireDefault(_GroupController);

//Validation middleware & schemas
var _validator = require('./app/middlewares/validator'); var _validator2 = _interopRequireDefault(_validator);
var _schema = require('./schema'); var schemas = _interopRequireWildcard(_schema);

const routes = new (0, _express.Router)();

//Users routes
routes.get('/users', _UserController2.default.index);
routes.put('/users/:userId', _validator2.default.call(void 0, schemas.updateUserSchema),_UserController2.default.update);
routes.post('/users', _validator2.default.call(void 0, schemas.createUserSchema), _UserController2.default.store);
routes.delete('/users/:userId', _UserController2.default.delete);

//Groups routes
routes.get('/groups', _GroupController2.default.index);

/*
routes.post('/users', UserController.store);

routes.put('/users/:id', UserController.update);
routes.get('/users/', UserController.index);

routes.get('/profiles', GroupController.index);
routes.get('/profiles/:id' , GroupController.edit);
routes.post('/profiles', GroupController.store);
routes.put('/profiles/:id', GroupController.update);

*/

exports. default = routes;