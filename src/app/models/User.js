import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class User extends Model{
    static init(sequelize){
        super.init({
            userId: {
            type: DataTypes.UUID,
            primaryKey: true
            },
            accountId:DataTypes.UUID,           
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,            
        },
        {
            sequelize,
            tableName: 'User'
        });
 
        this.addHook('beforeSave', async (model) => {
            if(!model.userId) {
                model.userId = uuidv4();                
            }
            if(!model.accountId) {
                model.accountId = uuidv4();
            }           
        });

        return this;
    }

    static associate(models) {        
        this.belongsTo(models.Group, { foreignKey: 'groupId', as: 'groups'});                   
    }
  
}

export default User;