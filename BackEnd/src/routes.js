import express from "express";
const router = express.Router();

import pessoasController from "./controllers/pessoasController.js";

router.post("/pessoas", pessoasController.create);
router.get("/pessoas", pessoasController.list);
router.get("/pessoas/:id", pessoasController.getById);
router.put("/pessoas/:id", pessoasController.update);
router.delete("/pessoas/:id", pessoasController.remove);

export default router;