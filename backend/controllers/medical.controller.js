import { MedicalRecord, Patient, User } from "../models/index.js";

export const createMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      diagnosis,
      treatment,
      medications,
      allergies,
      notes,
      date,
    } = req.body;

    if (!patientId || !diagnosis) {
      return res
        .status(400)
        .json({ message: "patientId and diagnosis are required" });
    }

    const medicalRecord = await MedicalRecord.create({
      patientId,
      diagnosis,
      treatment,
      medications,
      allergies,
      notes,
      date,
    });

    res.status(201).json(medicalRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.findAll({
      where: { patientId: req.params.patientId },
      include: [
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
    });
    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const getRecord = await MedicalRecord.findByPk(id);
    if (!getRecord) {
      res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json(getRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MedicalRecord.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedMedicalRecord = await MedicalRecord.findByPk(id);
      res.status(200).json(updatedMedicalRecord);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MedicalRecord.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Medical record not found");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
