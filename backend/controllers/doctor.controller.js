import { Doctor, User } from "../models/index.js";

export const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: User,
          attributes: ["email", "role"],
        },
      ],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
    if (!doctor) res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Doctor.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedDoctor = await Doctor.findByPk(id);
      res.status(200).json(updatedDoctor);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
