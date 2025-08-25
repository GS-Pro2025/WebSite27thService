'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('calendar_events', {
      event_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      move_id: {
        type: Sequelize.CHAR(12),
        allowNull: false,
        references: {
          model: 'moves',
          key: 'move_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      google_event_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true
      },
      event_status: {
        type: Sequelize.ENUM('scheduled', 'confirmed', 'cancelled', 'completed'),
        allowNull: true,
        defaultValue: 'scheduled'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('calendar_events');
  }
};
