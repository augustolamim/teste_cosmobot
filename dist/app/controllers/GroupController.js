"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);

class GroupController {
  async index(req, res) {
    
    try {      
      const groups = await _Group2.default.findAll({
        logging: console.log,
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

exports. default = new GroupController;