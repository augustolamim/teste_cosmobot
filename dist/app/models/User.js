"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _uuid = require('uuid');

class User extends _sequelize.Model{
    static init(sequelize){
        super.init({
            userId: {
            type: _sequelize.DataTypes.UUID,
            primaryKey: true
            },
            accountId:_sequelize.DataTypes.UUID,           
            firstName: _sequelize.DataTypes.STRING,
            lastName: _sequelize.DataTypes.STRING,
            email: _sequelize.DataTypes.STRING,            
        },
        {
            sequelize,
            tableName: 'User'
        });
 
        this.addHook('beforeSave', async (model) => {
            if(!model.userId) {
                model.userId = _uuid.v4.call(void 0, );                
            }
            if(!model.accountId) {
                model.accountId = _uuid.v4.call(void 0, );
            }           
        });

        return this;
    }

    static associate(models) {        
        this.belongsTo(models.Group, { foreignKey: 'groupId', as: 'groups'});                   
    }
  
}

exports. default = User;