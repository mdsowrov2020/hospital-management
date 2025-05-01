import {
  loginUser,
  registerAdmin,
  registerUser,
} from "../../services/auth/authService.js";

// export const register = async (req, res, next) => {
//   try {
//     const { user, token } = await registerUser(req.body);
//     res.status(201).json({ success: true, user, token });
//   } catch (error) {
//     next(error);
//   }
// };
export const register = async (req, res, next) => {
  try {
    // Ensure we have either role or isDoctor
    if (!req.body.role && typeof req.body.isDoctor === "undefined") {
      return res.status(400).json({
        success: false,
        error: "Either 'role' or 'isDoctor' must be provided",
      });
    }

    const { user, token } = await registerUser(req.body);

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
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

export const getCurrentUser = async (req, res, next) => {
  try {
    // The user is attached to the request by the authenticate middleware
    const user = req.user;

    // Remove sensitive information
    const userWithoutPassword = user.toJSON ? user.toJSON() : user;
    delete userWithoutPassword.password;

    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
