import User from "../../models/user.model";
import { generateToken } from "../../utils/jwt";
import bcrypt from "bcrypt";

const registerUser = async (userdata) => {
  const { firstName, lastName, email, password, isDoctor } = userdata;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = isDoctor ? "doctor" : "patient";

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user.id, user.role);
  const userWithoutPassword = user.toJSON();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

//  Login

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
