"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("moves", {
      move_id: {
        type: Sequelize.CHAR(12),
        primaryKey: true,
        allowNull: false,
      },
      person_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "persons",
          key: "person_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "confirmed",
          "in_progress",
          "completed",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      tentative_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      confirmed_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      origin_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      destination_address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      total_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("moves");
  },
};
