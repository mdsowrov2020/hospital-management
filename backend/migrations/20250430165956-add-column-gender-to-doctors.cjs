"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable("Doctors");

    // Only add gender column if it doesn't exist
    if (!tableDescription.gender) {
      await queryInterface.addColumn("Doctors", "gender", {
        type: Sequelize.STRING,
        allowNull: true, // Set to false if you want it required
        defaultValue: null, // Add if you want a default value
      });
    }
  },

  down: async (queryInterface) => {
    const tableDescription = await queryInterface.describeTable("Doctors");

    // Only remove gender column if it exists
    if (tableDescription.gender) {
      await queryInterface.removeColumn("Doctors", "gender");
    }
  },
};
