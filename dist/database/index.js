"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _Groupjs = require('../app/models/Group.js'); var _Groupjs2 = _interopRequireDefault(_Groupjs);

var _Userjs = require('../app/models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);

var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);

const models = [    
    _Groupjs2.default,    
    _Userjs2.default
];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new (0, _sequelize2.default)(_databasejs2.default);    
        models.map(model => model.init(this.connection));
        models.map(model => model.associate(this.connection.models));
    }
}

exports. default = new Database;