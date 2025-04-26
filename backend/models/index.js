import { sequelize } from "../db/db.js";
import Appointment from "./appointment.model.js";
import Doctor from "./doctor.model.js";
import MedicalRecord from "./medicalRecord.model";
import Patient from "./patient.model.js";
import User from "./user.model.js";

User.hasOne(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Patient, { foreignKey: "userId" });
Patient.belongsTo(User, { foreignKey: "userId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

Patient.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(Patient, { foreignKey: "patientId" });

Patient.hasMany(MedicalRecord, { foreignKey: "patientId" });
MedicalRecord.belongsTo(Patient, { foreignKey: "patientId" });

export { User, Doctor, Patient, Appointment, MedicalRecord };
