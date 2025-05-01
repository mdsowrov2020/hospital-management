import { generateToken } from "../../utils/jwt.js";
import * as bcrypt from "bcryptjs";
import { Doctor, Patient, User } from "../../models/index.js";

// const registerUser = async (userdata) => {
//   const { email, password, isDoctor } = userdata;

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     throw new Error("Email already in use");
//   }

//   const role = isDoctor ? "doctor" : "patient";

//   const user = await User.create({
//     email,
//     password,
//     role,
//   });

//   const token = generateToken(user.id, user.role);
//   const userWithoutPassword = user.toJSON();
//   delete userWithoutPassword.password;

//   return { user: userWithoutPassword, token };
// };

const registerUser = async (userData) => {
  const { email, password, isDoctor, role } = userData;

  // Determine the role
  const userRole = role || (isDoctor ? "doctor" : "patient");

  // Create the user
  const user = await User.create({
    email,
    password,
    role: userRole,
  });

  // Create basic profile based on role
  if (user.role === "patient") {
    await Patient.create({
      userId: user.id,
      fullName: null,
      dateOfBirth: null,
      gender: null,
    });
  } else if (user.role === "doctor") {
    await Doctor.create({
      userId: user.id,
      fullName: null,
      licenseNumber: null,
      specialization: null,
    });
  }

  const token = generateToken(user);
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id, user.role);
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;
  return { user: userWithoutPassword, token };
};

export { registerUser, loginUser };

export const registerAdmin = async (adminData, currentAdmin) => {
  if (currentAdmin.role !== "admin") {
    throw new Error("Only admins can create admins");
  }

  const user = await User.create({
    ...adminData,
    role: "admin",
  });

  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;
  return userWithoutPassword;
};
