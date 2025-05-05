import express from "express";
import { register, login, updateProfile } from "../controllers/authControllers.js";
import { loginValidation, registerValidation } from "../middlewares/validators/authValidator.js";
import { validateRequest } from "../middlewares/validators/validateRequest.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,validateRequest, register);
authRouter.post("/login",loginValidation,validateRequest, login);

authRouter.put("/update_profile/:id", authenticateUser, updateProfile);

export default authRouter;
