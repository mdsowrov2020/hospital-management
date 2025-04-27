import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js      ";

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Doctor",
      key: "id",
    },
  },

  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Patient",
      key: "id",
    },
  },

  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  appointmentTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
    defaultValue: "scheduled",
  },
  reason: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

export default Appointment;
