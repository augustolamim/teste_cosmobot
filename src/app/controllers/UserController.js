import User from '../models/User';
import Group from '../models/Group';
import { Sequelize } from 'sequelize';

class UserController{

  //GET /users retrieves users based on a search query
  async index(req, res) {

    //query filters
    const filters = {
      userId:{[Sequelize.Op.eq]:req.query.userId},     
      lastName:{[Sequelize.Op.substring]:req.query.lastName},
      email:{[Sequelize.Op.eq]:req.query.email},     
      groupId:{[Sequelize.Op.eq]:req.query.groupId},      
      firstName:{[Sequelize.Op.substring]:req.query.firstName},
      $GROUP_NAME$:{[Sequelize.Op.substring]:req.query.GROUP_NAME},
    }

    //removes non used filters
    Object.keys(filters).forEach(key => !(key in req.query) && delete filters[key]);
    
    try { 

      //check to see if query was made with non existent filter
      if(Object.keys(filters).length === 0 && Object.keys(req.query).length> 0 ){
        return res.status(400).json({ error: 'Invalid query' });
      }

      const users = await User.findAll({
        where: filters,
        attributes:['userId','accountId','firstName','lastName','email'],
        include: {
           association: 'groups',
           attributes: ['GROUP_ID','GROUP_NAME', 'GROUP_DESCRIPTION']
        } 
      });
      
      if(users.length===0){
        return res.status(400).json({ error: 'No users found' });
      }

      return res.status(200).json({
        users,
      });

    }
    catch (error) {
      return res.status(500).json({ 
        error: 'There was an error when loading the data.', 
        stack: error.stack,
        local: 'users.index',
      });
    }
  }
  //POST /users creates new users
  async store(req, res) {    

    const { 
      firstName,
      lastName,
      email,     
      groupId,       
    } = req.body;

    try {      
      //check to see if email is already in use
      const userExists = await User.findOne({
        where: { email },
        attributes: ['email']
      });
      
      if(userExists){
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
      
      //check to see if groupId is from an actual group
      const group = await Group.findByPk(groupId);

      if(!group && groupId){
        return res.status(400).json({ error: "This group doesn't exist." });
      }

      const user = await User.create({        
        firstName,
        lastName,
        email,               
        groupId
      });
      
      return res.status(201).json({
        user
      }); 

    }
    catch (error) {
      return res.status(500).json({ 
        error: 'There was an error when saving the data.', 
        stack: error.stack,
        local: 'user.store',
      });
    }
  }
  //PUT /users/:userId updates users by id
  async update(req,res){

    const { 
        firstName,
        lastName,
        email,     
        groupId,       
    } = req.body;    
        
    const { userId } = req.params;

    try {    
      //check if user exists
      const user = await User.findByPk(userId);
      if(!user){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }
      //check to see if trying to update with new email that is already in use
      if(email && user.email !== email) {
        const userExists = await User.findOne({
          where: { email },
        });
          
        if(userExists){
          return res.status(400).json({ error: 'E-mail already in use.' });
        }
      }
      //check to see if groupId is from an actual group
      const group = await Group.findByPk(groupId);

      if(!group && groupId){
          return res.status(400).json({ error: "This group doesn't exist." });
      }

      await User.update({        
        firstName,
        lastName,
        email,     
        groupId,
      }, {
        where: { userId },
      });

      return res.status(200).json({
        firstName,
        lastName,
        email,     
        groupId,
      });
    }
    catch (error) {
      return res.status(500).json({ 
        error: 'Ocorreu um erro ao salvar os dados.', 
        stack: error.stack,
        local: 'user.update',
      });
    }
  }
  //DELETE /users/:userId deletes users by id
  async delete(req, res) { 

    const { userId } = req.params;

    try {
      //check if user exists
      const user = await User.findByPk(userId);
      if(!user){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }
      
      await User.destroy({        
        where: {userId: userId}
      }); 
      

      return res.status(200).json({
        message:"User deleted",
      });

    } catch (error) {
      return res.status(500).json({ 
        error: 'There was an error when deleting user', 
        stack: error.stack,
        local: 'users.delete',
      });
    }
  }

}

export default new UserController;