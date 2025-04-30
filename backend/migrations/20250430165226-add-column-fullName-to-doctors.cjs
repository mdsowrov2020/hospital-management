"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the `fullName` column
    await queryInterface.addColumn("Doctors", "fullName", {
      type: Sequelize.STRING,
      allowNull: true, // Change to false if it's a required field
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the `fullName` column
    await queryInterface.removeColumn("Doctors", "fullName");
  },
};
