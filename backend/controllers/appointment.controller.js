import { where } from "sequelize";
import { Appointment, Doctor, Patient, User } from "../models/index.js";
export const getAppointments = async (req, res) => {
  try {
    const { doctorId, patientId, status, startDate, endDate } = req.query;

    const where = {};
    if (doctorId) where.doctorId = doctorId;
    if (patientId) where.patientId = patientId;
    if (status) where.status = status;

    if (startDate && endDate) {
      where.appointmentDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const appointments = await Appointment.findAll({
      where,
      include: [
        {
          model: Doctor,
          include: [{ model: User, attributes: ["email"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["email"] }],
        },
      ],
      order: [
        ["appointmentDate", "ASC"],
        ["appointmentTime", "ASC"],
      ],
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: Doctor,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppointmentByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const appointment = await Appointment.findOne({ where: { patientId } });
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "No appointment found on this patient id" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.body;

    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const dailyLimit = doctor.dailyAppointmentLimit;

    const existingAppointmentCount = await Appointment.count({
      where: {
        doctorId,
        appointmentDate,
        status: "scheduled",
      },
    });

    if (existingAppointmentCount >= dailyLimit) {
      return res.status(400).json({
        message: `Daily appointment limit of ${dailyLimit} reached for this doctor on ${appointmentDate}`,
      });
    }

    // Create new appointment
    const appointmentData = {
      ...req.body,
      status: "scheduled",
    };

    const appointment = await Appointment.create(appointmentData);

    const newAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        {
          model: Doctor,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
      ],
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Appointment.update(req.body, {
      where: { id },
    });

    if (updated) {
      const updatedAppointment = await Appointment.findByPk(id, {
        include: [
          {
            model: Doctor,
            include: [{ model: User, attributes: ["email", "role"] }],
          },
          {
            model: Patient,
            include: [{ model: User, attributes: ["email", "role"] }],
          },
        ],
      });
      return res.status(200).json(updatedAppointment);
    }
    throw new Error("Appointment not found");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Appointment not found");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const getAppointmentByDoctorID = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
//     const appointments = await Appointment.findAll({
//       where: { doctorId: doctorId },
//       include: [
//         {
//           model: Patient,
//           include: [{ model: User, attributes: ["email"] }],
//         },
//       ],
//     });
//     if (!appointments) {
//       return res
//         .status(404)
//         .json({ message: "No appointment found on this doctor id" });
//     }
//     res.status(200).json(appointments);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const getAppointmentsByDoctorID = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query; // Get the optional date query param

    const whereClause = { doctorId };
    if (date) whereClause.appointmentDate = date; // Filter by date if provided

    const appointments = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: Patient,
          include: [{ model: User, attributes: ["email"] }],
        },
      ],
    });

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStatusByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();
    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAppointmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: Doctor,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["email", "role"] }],
        },
      ],
      order: [
        ["appointmentDate", "ASC"],
        ["appointmentTime", "ASC"],
      ],
    });

    if (!appointments.length) {
      return res.status(404).json({
        message: "No appointments found for this patient ID",
      });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
