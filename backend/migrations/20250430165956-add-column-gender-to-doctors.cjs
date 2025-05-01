"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the `gender` column
    await queryInterface.addColumn("Doctors", "gender", {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if required
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the `gender` column
    await queryInterface.removeColumn("Doctors", "gender");
  },
};
