import express from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { noteValidation } from "../middlewares/validators/noteValidator.js";
import { validateRequest } from "../middlewares/validators/validateRequest.js";

const noteRouter = express.Router();

// Create a note
noteRouter.post("/create", authenticateUser, noteValidation, validateRequest, createNote);

// Get all notes
noteRouter.get("/",authenticateUser, getAllNotes);

// Update a note
noteRouter.put("/:id", authenticateUser, updateNote);

// Delete a note
noteRouter.delete("/delete-note/:id", authenticateUser, deleteNote);

export default noteRouter;
