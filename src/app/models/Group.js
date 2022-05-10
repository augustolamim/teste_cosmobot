import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid'; 

class Group extends Model{
    static init(sequelize) {
        super.init({
            GROUP_ID: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            GROUP_NAME: DataTypes.STRING,
            GROUP_DESCRIPTION: DataTypes.STRING            
        },
        {
            sequelize,
            tableName: 'Groups',
        });

        this.addHook('beforeSave', async (model) => {
            if(!model.GROUP_ID) {
                model.GROUP_ID = uuidv4();
            }
        });
 
        return this;
    }
    
    static associate(models) {
        this.hasMany(models.User, { foreignKey: 'groupId'});
    }
}

export default Group;