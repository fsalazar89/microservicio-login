import { Router } from "express";
const routerInit = Router();

import { Middleware } from "../middleware/middleware";
const middleware = new Middleware();

import { Init } from "../controllers/controller.init";
const init = new Init();

routerInit.get(
  "/",
  middleware.validarTokenEstatico,
  init.endpointInicial.bind(init)
);

export default routerInit;
