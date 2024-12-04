import { Router } from "express";
const routerAuth = Router();

import { Middleware } from "../middleware/middleware";
const middleware = new Middleware();

import { ControllerAuth } from "../controllers/controller.auth";
const controllerAuth = new ControllerAuth();

routerAuth.post(
  "/iniciosesion",
  middleware.limpiarDatos,
  middleware.validarTokenEstatico,
  controllerAuth.constrollerLogin.bind(controllerAuth)
);

export default routerAuth;
