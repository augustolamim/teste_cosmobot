"use strict";'use strict';
const uuid =  require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groups', 
    [
      { 
        GROUP_ID: uuid.v4(),
        GROUP_NAME: 'Support Agents',        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        GROUP_ID: uuid.v4(),
        GROUP_NAME: 'Bot Builders',        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        GROUP_ID: uuid.v4(),
        GROUP_NAME: 'Bot Admins',        
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
