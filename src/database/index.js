import Sequelize from 'sequelize';

import Group from '../app/models/Group.js';

import User from '../app/models/User.js';

import databaseConfig from '../config/database.js';

const models = [    
    Group,    
    User
];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);    
        models.map(model => model.init(this.connection));
        models.map(model => model.associate(this.connection.models));
    }
}

export default new Database;