'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('move_services', {
      move_id: {
        type: Sequelize.CHAR(12),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'moves',
          key: 'move_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      service_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'services',
          key: 'service_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('move_services');
  }
};
