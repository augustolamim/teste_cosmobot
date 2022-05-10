"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
      GROUP_ID: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
      },
      
      GROUP_NAME: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },

      GROUP_DESCRIPTION: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};