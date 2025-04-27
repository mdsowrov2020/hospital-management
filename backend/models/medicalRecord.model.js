import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const MedicalRecord = sequelize.define("MedicalRecord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Patients",
      key: "id",
    },
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.TEXT,
  },
  medications: {
    type: DataTypes.TEXT,
  },
  allergies: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default MedicalRecord;
