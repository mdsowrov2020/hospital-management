import User from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

// middleware/auth.js
export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication required");
    }

    const decoded = verifyToken(token);

    // Debug log to check the decoded token
    console.log("Decoded token:", decoded);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
      raw: true, // Convert to plain object
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Ensure we're attaching a plain object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error("Unauthorized access");
    }
    next();
  };
};
