// import { DataTypes } from "sequelize";
// import { sequelize } from "../db/db.js      ";

// const Appointment = sequelize.define(
//   "Appointment",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     doctorId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Doctors",
//         key: "id",
//       },
//     },

//     patientId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "Patients",
//         key: "id",
//       },
//     },

//     appointmentDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     appointmentTime: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM("scheduled", "completed", "cancelled"),
//       defaultValue: "scheduled",
//     },
//     reason: {
//       type: DataTypes.TEXT,
//     },
//     notes: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     tableName: "Appointments", // Match the exact case used in PostgreSQL
//     freezeTableName: true, // Prevent Sequelize from altering the table name
//   }
// );

// export default Appointment;

// models/Appointment.js
// models/Appointment.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Doctors",
        key: "id",
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patients",
        key: "id",
      },
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, // Validate HH:MM:SS format
      },
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
  },
  {
    tableName: "Appointments",
    freezeTableName: true,
  }
);

export default Appointment;
