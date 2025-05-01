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
          include: [{ model: User, attributes: ["firstName", "lastName"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["firstName", "lastName"] }],
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

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    const newAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        {
          model: Doctor,
          include: [{ model: User, attributes: ["firstName", "lastName"] }],
        },
        {
          model: Patient,
          include: [{ model: User, attributes: ["firstName", "lastName"] }],
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
            include: [{ model: User, attributes: ["firstName", "lastName"] }],
          },
          {
            model: Patient,
            include: [{ model: User, attributes: ["firstName", "lastName"] }],
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
