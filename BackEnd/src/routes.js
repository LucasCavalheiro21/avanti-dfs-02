import { Router } from "express";
import express from "express";
import pessoasController from "./controllers/pessoasController.js";
import {
    listarConhecimentos,
    criarConhecimento,
    atualizarConhecimento,
    deletarConhecimento
} from "./controllers/conhecimentosController.js";

const routes = Router();

routes.post("/pessoas", pessoasController.create);
routes.get("/pessoas", pessoasController.list);
routes.get("/pessoas/:id", pessoasController.getById);
routes.put("/pessoas/:id", pessoasController.update);
routes.delete("/pessoas/:id", pessoasController.remove);

routes.get("/conhecimentos", listarConhecimentos);
routes.post("/conhecimentos", criarConhecimento);
routes.put("/conhecimentos/:id", atualizarConhecimento);
routes.delete("/conhecimentos/:id", deletarConhecimento);

export default routes;