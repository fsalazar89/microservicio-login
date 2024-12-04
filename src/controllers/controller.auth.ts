import { Request, Response } from "express";
import { Utils } from "../utils/utils";
import { ServiceAuth } from "../services/service.auth";

export class ControllerAuth {
  private utils: Utils;
  private serviceAuth: ServiceAuth;

  constructor() {
    this.utils = new Utils();
    this.serviceAuth = new ServiceAuth();
  }

  constrollerLogin = async (req: Request, res: Response) => {

    if (!req.body.usuairo) {
      res.status(200).json({estado:false, mensaje: 'El usuario es requerido', respuesta: null});
      return;
    } else if (!req.body.clave){
      res.status(200).json({estado:false, mensaje: 'La clave es requerida', respuesta: null});
      return;
    } else {
      
      const respuestaUsuario = await this.serviceAuth.serviceLogin(req.body.usuairo, req.body.clave);

      if (!respuestaUsuario) {
        res.status(401).json({estado:false, mensaje: 'Fallo la consulta del usuario', respuesta: null});
        return;
      } else {
        res.status(200).json({estado:true, mensaje: 'Consulta exitosa', respuesta: respuestaUsuario});
        return;
      }

    }

  }

}
