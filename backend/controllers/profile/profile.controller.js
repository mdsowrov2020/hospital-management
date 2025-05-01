import { Doctor, Patient, User } from "../../models/index.js";
import { Op } from "sequelize";
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    const profileData = req.body;

    // Validate doctor-specific fields if role is doctor
    if (user.role === "doctor") {
      if (profileData.licenseNumber) {
        const existingDoctor = await Doctor.findOne({
          where: {
            licenseNumber: profileData.licenseNumber,
            userId: { [Op.ne]: user.id }, // Check other doctors with same license
          },
        });
        if (existingDoctor) {
          return res.status(400).json({
            success: false,
            error: "License number must be unique",
          });
        }
      }
    }

    let updatedProfile;
    let model;

    if (user.role === "patient") {
      model = Patient;
    } else if (user.role === "doctor") {
      model = Doctor;
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid role for profile update",
      });
    }

    // Convert empty strings to null
    const cleanedData = Object.entries(profileData).reduce(
      (acc, [key, value]) => {
        acc[key] = value === "" ? null : value;
        return acc;
      },
      {}
    );

    // Update or create profile
    const [affectedCount, updatedRows] = await model.update(cleanedData, {
      where: { userId: user.id },
      returning: true,
      individualHooks: true,
    });

    if (affectedCount === 0) {
      // No profile exists, create one
      updatedProfile = await model.create({
        ...cleanedData,
        userId: user.id,
      });
    } else {
      updatedProfile = updatedRows[0];
    }

    // Get fresh data with associations if needed
    const fullProfile = await model.findOne({
      where: { userId: user.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({
      success: true,
      profile: fullProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    // Handle Sequelize errors
    let errorMessage = error.message;
    if (error.name === "SequelizeValidationError") {
      errorMessage = error.errors.map((e) => e.message).join(", ");
    }

    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
};

// controllers/profile/profile.controller.js
export const getProfile = async (req, res) => {
  try {
    // Debug log to check the user object

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    let profile;
    if (req.user.role === "patient") {
      profile = await Patient.findOne({
        where: { userId: req.user.id },
        raw: true,
      });
    } else if (req.user.role === "doctor") {
      profile = await Doctor.findOne({
        where: { userId: req.user.id },
        raw: true,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid user role",
      });
    }

    res.status(200).json(
      { ...profile, email: req.user.email, role: req.user.role } || {} // Return empty object if no profile
    );
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
