import { Utils } from "../utils/utils";
import jwt from "jsonwebtoken";
import { ModuleAuth } from "../models/model.auth";

export class ServiceAuth {
  private utils: Utils;
  private moduleAuth: ModuleAuth;
  private tokenEstaticoJWT: any;

  constructor() {
    this.utils = new Utils();
    this.moduleAuth = new ModuleAuth();
    this.tokenEstaticoJWT = process.env.SECRET_TOKEN_JWT;
  }
  
  private generarTokenJWT = (payload: Object) => {
    const expiresIn = process.env.TOKEN_EXPIRA;
    const tokenJwt = jwt.sign(payload, this.tokenEstaticoJWT, {
      expiresIn: expiresIn,
    });
    const token = this.utils.encriptarDato(tokenJwt);
    return token;
  };

  serviceLogin = async (usuario: string, clave: any)=>{
    let resultadoUsuario;
    let estadoUsuario = false;
    let resultadoModulos;
    let estadoModulos = false;
    let respuesta = null;

    const claveUsuario = this.utils.encriptarDato(clave);

    resultadoUsuario = await this.moduleAuth.serviceConsultaUsuario(usuario, claveUsuario);
    if (resultadoUsuario.estado === false) {
      return respuesta;
    } else {
      estadoUsuario = true;
    }

    // if (estadoUsuario) {
    //   resultadoModulos = await this.moduleAuth.serviceListarModulos(resultadoUsuario.respuesta.id_perfil, resultadoUsuario.respuesta.usuario);
    //   if (resultadoModulos.estado === false) {
    //     return respuesta;
    //   } else {
    //     estadoModulos = true;
    //   }
    // } else {
    //   return respuesta;
    // }

    if (estadoUsuario) {

      const payload = {perfil: resultadoUsuario.respuesta.id_perfil, usuario: resultadoUsuario.respuesta.usuario}
      const tokenJWT = this.generarTokenJWT(payload);
      if (resultadoUsuario.respuesta.clave_temporal) {
        respuesta = {
          token: tokenJWT,
          dataUsuario: {
            usuario:resultadoUsuario.respuesta.usuario,
            clave_temporal:resultadoUsuario.respuesta.clave_temporal,
          }
        }
        return respuesta;
      } else {
        
        respuesta = {
          token: tokenJWT,
          dataUsuario: resultadoUsuario.respuesta
        }
        return respuesta;

      }


    } else {
      return respuesta;
    }

  }

}
