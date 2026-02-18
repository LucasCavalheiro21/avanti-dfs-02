import express from "express";
import pessoasController from "./controllers/pessoasController.js";

const routes = express.Routes();

router.post("/pessoas", pessoasController.create);
router.get("/pessoas", pessoasController.list);
router.get("/pessoas/:id", pessoasController.getById);
router.put("/pessoas/:id", pessoasController.update);
router.delete("/pessoas/:id", pessoasController.remove);

export default routes;