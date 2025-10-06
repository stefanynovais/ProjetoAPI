import express from "express";
import {
    PostTutor,
    GetTutor,
    PatchTutor
} from "../../controllers/tutorController.js";

const router = express.Router();

router.post("/tutores", PostTutor);
router.get("/tutores/:id", GetTutor);
router.patch("/tutores/:id", PatchTutor);

export default router;
