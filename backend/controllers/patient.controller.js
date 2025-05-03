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
          attributes: ["email"],
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
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, ...otherData } = req.body;
    const role = req.user?.role || "unknown";

    // 1. Find current patient (include updatedBy in the query)
    const currentPatient = await Patient.findByPk(id, {
      attributes: { include: ["updatedBy"] }, // Ensure updatedBy is included
    });
    if (!currentPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // 2. Email change logic (same as before)
    if (email && email !== currentPatient.email) {
      const userWithEmail = await User.findOne({ where: { email } });
      if (userWithEmail && userWithEmail.id !== currentPatient.userId) {
        return res.status(409).json({
          message:
            "Email already in use by another user. Use a different email.",
        });
      }

      if (currentPatient.userId) {
        await User.update({ email }, { where: { id: currentPatient.userId } });
      }
    }

    // 3. Prepare update data with updatedBy
    const updateData = {
      ...otherData,
      updatedBy: role,
      ...(email !== undefined && { email }),
    };

    // 4. Perform update and fetch updated record with ALL attributes
    await Patient.update(updateData, { where: { id } });
    const updatedPatient = await Patient.findByPk(id, {
      attributes: {
        exclude: ["password"], // Exclude sensitive fields if any
      },
    });

    // 5. Verify updatedBy is included in response
    if (!updatedPatient.updatedBy) {
      updatedPatient.updatedBy = role;
      await updatedPatient.save();
    }

    return res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// export const deletePatient = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Patient.destroy({ where: { id: id } });
//     if (deleted) {
//       return res.status(202).json({ message: "Patient successfully deleted" });
//     }
//     throw new Error("Patient not found");
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const userId = patient.userId;
    await Patient.destroy({ where: { id } });

    if (userId) {
      await User.destroy({ where: { id: userId } });
    }
    return res
      .status(200)
      .json({ message: "Patient and user successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
