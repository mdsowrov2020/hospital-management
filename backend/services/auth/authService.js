import User from "../../models/user.model.js";
import { generateToken } from "../../utils/jwt.js";
import * as bcrypt from "bcryptjs";

const registerUser = async (userdata) => {
  const { firstName, lastName, email, password, isDoctor } = userdata;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // // REMOVE THIS LINE - let the model hook handle hashing
  // // const hashedPassword = await bcrypt.hash(password, 10);

  const role = isDoctor ? "doctor" : "patient";

  const user = await User.create({
    firstName,
    lastName,
    email,
    password, // Send plain password - hook will hash it
    role,
  });

  // Temporary: First user becomes admin
  // const isFirstUser = (await User.count()) === 0;
  // const role = isFirstUser ? "admin" : isDoctor ? "doctor" : "patient";

  // const user = await User.create({
  //   firstName,
  //   lastName,
  //   email,
  //   password, // Hashing is handled by model hook
  //   role,
  // });

  const token = generateToken(user.id, user.role);
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
    role: "admin", // Force admin role
  });

  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;
  return userWithoutPassword;
};
