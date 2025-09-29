import express from "express";
import {
    criarTutor,
    buscarTutor,
    atualizarTutor
} from "../../controllers/tutorController.js";

const router = express.Router();

router.post("/tutores", criarTutor);
router.get("/tutores/:id", buscarTutor);
router.patch("/tutores/:id", atualizarTutor);

export default router;
