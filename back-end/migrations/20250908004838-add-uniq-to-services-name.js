"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("services", {
      fields: ["name"],
      type: "unique",
      name: "uniq_services_name",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("services", "uniq_services_name");
  },
};
