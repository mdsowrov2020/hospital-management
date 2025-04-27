import Appointment from "./appointment.model.js";
import Doctor from "./doctor.model.js";
import MedicalRecord from "./medicalRecord.model.js";
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

async function syncModels() {
  try {
    await User.sync({ alter: true });
    await Doctor.sync({ alter: true });
    await Patient.sync({ alter: true });
    await Appointment.sync({ alter: true });
    await MedicalRecord.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

export { User, Doctor, Patient, Appointment, MedicalRecord };
