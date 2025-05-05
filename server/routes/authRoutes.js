import express from "express";
import { register, login, updateProfile, getProfile } from "../controllers/authControllers.js";
import { loginValidation, registerValidation } from "../middlewares/validators/authValidator.js";
import { validateRequest } from "../middlewares/validators/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,validateRequest, register);
authRouter.post("/login",loginValidation,validateRequest, login);

authRouter.put("/update_profile/:id", authenticateUser, updateProfile);
authRouter.get("/get_profile", authenticateUser, getProfile);

export default authRouter;
