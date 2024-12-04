import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { Utils } from "../utils/utils";
import conexionGestionDesarrollo from "../configs/config_db/db.gestion_desarrollo";

export class Middleware {
  private utils: Utils;
  private tokenEstaticoJWT: any;
  private dbConnection: Pool;

  constructor() {
    this.utils = new Utils();
    this.tokenEstaticoJWT = process.env.SECRET_TOKEN_JWT;
    this.dbConnection = conexionGestionDesarrollo();
  }

  limpiarDatos = (req: Request, res: Response, next: NextFunction) => {
    req.body = this.utils.sanearDatos(req.body);
    req.query = this.utils.sanearDatos(req.query);
    req.params = this.utils.sanearDatos(req.params);
    next();
  };

  validarTokenJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    const tokenDecodificado: any = this.utils.encriptarDato(token);
    try {
      const decoded = jwt.verify(tokenDecodificado, this.tokenEstaticoJWT);
      if (decoded) {
        req.body.dataUsuario = decoded;
        next();
      }
    } catch (error) {
      res
        .status(401)
        .json({ estado: false, mensaje: "Token no válido", resultado: error });
    }
  }

  validarPermisos = async (req: Request, res: Response, next: NextFunction) => {
    const usuario = req.body.dataUsuario.usuario;
    let url = req.originalUrl;
    const metodo = req.method;
    const posicion = url.indexOf("?");
    if (posicion !== -1) {
      url = url.split("?")[0];
    }

    try {
      const client = await this.dbConnection.connect();
      const querySql = `
        select
        tp.url,
        tp.metodo,
        tp.canal,
        tu.usuario_red 
        from tab_perfil_permisos tpp
        inner join tab_permisos tp on tp.id = tpp.id_permiso
        inner join tab_perfiles tp2 on tp2.id = tpp.id_perfil 
        inner join tab_usuarios tu on tu.id_perfil = tp2.id 
        where tu.usuario_red = $1
        and tp.url = $2
        and tp.metodo = $3`;
      const resultadoConsulta = await client.query(querySql, [
        usuario,
        url,
        metodo,
      ]);
      client.release(); // Retorna la conexión al pool cuando hayas terminado
      const resultado = resultadoConsulta.rows;
      if (resultado.length > 0 && resultado[0].usuario_red === usuario) {
        next();
      } else {
        const response = {
          estado: false,
          mensaje: "Sin Permisos",
          resultado: "",
        };
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({
        estado: false,
        mensaje: "Operacion Fallida",
        resultado: error,
      });
    }
  };

  validarTokenEstatico = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const tokenApp = `Bearer ${process.env.TOKEN_LOGIN}`;
    const validarTokenLogin = token === tokenApp;
    if (validarTokenLogin) {
      next();
    } else {
      const response = { estado: false, mensaje: "Acceso denegado", resultado: null };
      res.status(401).json(response);
    }
  };
}
