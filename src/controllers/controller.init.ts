import { Request, Response } from 'express';
import { Utils } from "../utils/utils";

export class Init {

    private utils: Utils;

    constructor(){
        this.utils = new Utils();
    }

  endpointInicial(req: Request, res: Response) {

    const hoy = this.utils.fechaActualColombia();
    const brasil = this.utils.fechaBrasilAColombia(hoy);
    const clave = this.utils.encriptarDato('123');

    let estado: boolean = true;
    let mensaje: string = `API Rest ${hoy}`;
    let response: any = [];

    res.status(200).json({estado:estado, mensaje: mensaje, respuesta: response});

  }
}
