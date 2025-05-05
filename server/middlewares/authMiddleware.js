import jwt from "jsonwebtoken";
const {verify} = jwt
import "dotenv/config"

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
