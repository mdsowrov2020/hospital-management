import {
  loginUser,
  registerAdmin,
  registerUser,
} from "../../services/auth/authService.js";

export const register = async (req, res, next) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(error);
  }
};

export const registerAdminController = async (req, res, next) => {
  try {
    const user = await registerAdmin(req.body, req.user);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
