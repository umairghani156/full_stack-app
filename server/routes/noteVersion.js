import express from "express";
import { getNoteVersions, revertVersion } from "../controllers/noteVersionControllers.js";

const noteVersionRouter = express.Router();

noteVersionRouter.get("/get-all/:id", getNoteVersions);
noteVersionRouter.put("/:id/revert/:versionId", revertVersion);


export default noteVersionRouter;