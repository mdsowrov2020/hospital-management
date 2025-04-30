import { DataTypes } from "sequelize";

import { sequelize } from "../db/db.js";

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  consultationFee: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  availableDays: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  availableHours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Doctor;
