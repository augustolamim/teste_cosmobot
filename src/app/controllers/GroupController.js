import Group from '../models/Group';

class GroupController {
  //GET /groups retrieves all groups
  async index(req, res) {
    
    try {      
      const groups = await Group.findAll({        
        attributes: ['GROUP_ID', 'GROUP_NAME', 'GROUP_DESCRIPTION'],}
      );      

      return res.status(200).json({
        groups,
      });

    }
    catch (error) {   
      return res.status(500).json({ 
        error: 'There was an error when loading the data.', 
        stack: error.stack,
        local: 'groups.index',
      });
    }
  }
}

export default new GroupController;