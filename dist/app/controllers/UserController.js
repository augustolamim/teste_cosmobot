"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _sequelize = require('sequelize');

class UserController{

  async index(req, res) {
   
    const filters = {
      userId:{[_sequelize.Sequelize.Op.eq]:req.query.userId},     
      lastName:{[_sequelize.Sequelize.Op.substring]:req.query.lastName},
      email:{[_sequelize.Sequelize.Op.eq]:req.query.email},     
      groupId:{[_sequelize.Sequelize.Op.eq]:req.query.groupId},      
      firstName:{[_sequelize.Sequelize.Op.substring]:req.query.firstName},
      $GROUP_NAME$:{[_sequelize.Sequelize.Op.substring]:req.query.GROUP_NAME},
    }
    
    Object.keys(filters).forEach(key => !(key in req.query) && delete filters[key]);
    
    try { 

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

  async store(req, res) {    

    const { 
      firstName,
      lastName,
      email,     
      groupId,       
    } = req.body;

    try {      
      
      const userExists = await _User2.default.findOne({
        where: { email },
        attributes: ['email']
      });

      if(userExists){
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
      
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

  async update(req,res){

    const { 
        firstName,
        lastName,
        email,     
        groupId,       
    } = req.body;    
        
    const { userId } = req.params;

    try {    
      
      const user = await _User2.default.findByPk(userId);
      if(!user){
        return res.status(400).json({ error: 'User doesnt exist.' });
      }
      
      if(email && user.email !== email) {
        const userExists = await _User2.default.findOne({
          where: { email },
        });
          
        if(userExists){
          return res.status(400).json({ error: 'E-mail already in use.' });
        }
      }

      const group = await _Group2.default.findByPk(groupId);

      if(!group && groupId){
          return res.status(400).json({ error: "This group doesn't exist." });
      }

      await _User2.default.update({
        logging:console.log,
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

  async delete(req, res) { 

    const { userId } = req.params;

    try {            
      
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