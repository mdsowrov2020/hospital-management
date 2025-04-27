import { Patient, User } from "../models/index.js";

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json("Patient not found");
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const upatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Patient.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedPatient = await Patient.findByPk(id);
      res.status(200).json(updatedPatient);
    }
    throw new Error("User not found");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Patient not found");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
