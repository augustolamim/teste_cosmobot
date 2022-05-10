"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _sequelize = require('sequelize');

class UserController{

  //GET /users retrieves users based on a search query
  async index(req, res) {

    //query filters
    const filters = {
      userId:{[_sequelize.Sequelize.Op.eq]:req.query.userId},     
      lastName:{[_sequelize.Sequelize.Op.substring]:req.query.lastName},
      email:{[_sequelize.Sequelize.Op.eq]:req.query.email},     
      groupId:{[_sequelize.Sequelize.Op.eq]:req.query.groupId},      
      firstName:{[_sequelize.Sequelize.Op.substring]:req.query.firstName},
      $GROUP_NAME$:{[_sequelize.Sequelize.Op.substring]:req.query.GROUP_NAME},
    }

    //removes non used filters
    Object.keys(filters).forEach(key => !(key in req.query) && delete filters[key]);
    
    try { 

      //check to see if query was made with non existent filter
      if(Object.keys(filters).length === 0 && Object.keys(req.query).length> 0 ){
        return res.status(400).json({ error: 'Invalid query' });
      }

      const users = await _User2.default.findAll({
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
      const userExists = await _User2.default.findOne({
        where: { email },
        attributes: ['email']
      });
      
      if(userExists){
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
      
      //check to see if groupId is from an actual group
      const group = await _Group2.default.findByPk(groupId);

      if(!group && groupId){
        return res.status(400).json({ error: "This group doesn't exist." });
      }

      const user = await _User2.default.create({        
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
      const user = await _User2.default.findByPk(userId);
      if(!user){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }
      //check to see if trying to update with new email that is already in use
      if(email && user.email !== email) {
        const userExists = await _User2.default.findOne({
          where: { email },
        });
          
        if(userExists){
          return res.status(400).json({ error: 'E-mail already in use.' });
        }
      }
      //check to see if groupId is from an actual group
      const group = await _Group2.default.findByPk(groupId);

      if(!group && groupId){
          return res.status(400).json({ error: "This group doesn't exist." });
      }

      await _User2.default.update({        
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
      const user = await _User2.default.findByPk(userId);
      if(!user){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }
      
      await _User2.default.destroy({        
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

exports. default = new UserController;