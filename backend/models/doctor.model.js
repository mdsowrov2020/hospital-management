import { DataTypes } from "sequelize";

import { sequelize } from "../db/db.js";

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  consultationFee: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("male", "female", "other"),
    allowNull: true,
  },
  availableDays: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  availableHours: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dailyAppointmentLimit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    // unique: true,
    // validate: {
    //   is: /^[0-9\-+\s()]{7,20}$/i,
    // },
  },
});

export default Doctor;
