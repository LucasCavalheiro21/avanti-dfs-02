import { Router } from "express";
import pessoasController from "./controllers/pessoasController.js";
import conhecimentosController from "./controllers/conhecimentosController.js";

const routes = Router();

routes.post("/login", pessoasController.login);
routes.post("/pessoas", pessoasController.create);
routes.get("/pessoas", pessoasController.list);
routes.get("/pessoas/:id", pessoasController.getById);
routes.put("/pessoas/:id", pessoasController.update);
routes.delete("/pessoas/:id", pessoasController.remove);

routes.post("/conhecimentos", conhecimentosController.create);
routes.get("/conhecimentos", conhecimentosController.list);
routes.get("/conhecimentos/:id", conhecimentosController.getById);
routes.put("/conhecimentos/:id", conhecimentosController.update);
routes.delete("/conhecimentos/:id", conhecimentosController.remove);

export default routes;
