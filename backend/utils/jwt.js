import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the decoded object has the expected structure
    if (!decoded.id) {
      throw new Error("Invalid token payload");
    }

    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    throw new Error("Invalid token");
  }
};
export { generateToken, verifyToken };
