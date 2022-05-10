"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User',  {
        userId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },

        accountId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },

        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },        
        
        groupId: {          
          type: Sequelize.UUID,
          allowNull: true,
          references: { model: 'Groups', key: 'GROUP_ID' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },

        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        }, 
        
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
