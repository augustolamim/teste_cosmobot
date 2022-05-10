"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _uuid = require('uuid'); 

class Group extends _sequelize.Model{
    static init(sequelize) {
        super.init({
            GROUP_ID: {
                type: _sequelize.DataTypes.UUID,
                primaryKey: true
            },
            GROUP_NAME: _sequelize.DataTypes.STRING,
            GROUP_DESCRIPTION: _sequelize.DataTypes.STRING            
        },
        {
            sequelize,
            tableName: 'Groups',
        });

        this.addHook('beforeSave', async (model) => {
            if(!model.GROUP_ID) {
                model.GROUP_ID = _uuid.v4.call(void 0, );
            }
        });
 
        return this;
    }
    
    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'groupId'});
    }
}

exports. default = Group;