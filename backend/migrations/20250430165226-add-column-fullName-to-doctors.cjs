"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("Doctors");
    if (!tableDescription.fullName) {
      await queryInterface.addColumn("Doctors", "fullName", {
        type: Sequelize.STRING,
      });
    }
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn("Doctors", "fullName");
  },
};
