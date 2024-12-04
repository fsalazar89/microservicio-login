import { Pool } from "pg";
import { Utils } from "../utils/utils";
import conexionGestionDesarrollo from "../configs/config_db/db.gestion_desarrollo";

export class ModuleAuth {
  private utils: Utils;
  private dbConnection: Pool;

  constructor() {
    this.utils = new Utils();
    this.dbConnection = conexionGestionDesarrollo();
  }

  serviceConsultaUsuario = async (usuario: string, clave: any) => {
    try {
      const client = await this.dbConnection.connect();
      const querySql = `
      SELECT 
      tu.id,
      tu.primer_nombre,
      tu.segundo_nombre,
      tu.primer_apellido,
      tu.segundo_apellido,
      tu.usuario,
      tu.fecha_registro,
      tu.fecha_actualizacion,
      tu.id_perfil,
      tu.estado,
      tu.clave_temporal,
      tp.nombre as nombre_perfil
      FROM tab_usuarios tu
      inner join tab_perfiles tp on tp.id = tu.id_perfil
      where estado = $1 and usuario = $2 and clave = $3`;
      const resultadoConsulta = await client.query(querySql, [true, usuario, clave]);
      client.release(); // Retorna la conexión al pool cuando hayas terminado
      return { estado: true, respuesta: resultadoConsulta.rows[0] };
    } catch (error) {
      console.log(error);
      return { estado: false, respuesta: error };
    }
  };

  serviceListarModulos = async (idPerfil: any, usuario: any) => {
    try {
      const client = await this.dbConnection.connect();
      const querySql = `
      select
      DISTINCT tm.nombre as nombre_modulo,
      tm.tipo as tipo_modulo,
      tm.icono,
      tm.ruta,
      tm2.nombre as nombre_menu,
      tm2.icono as icono_menu
      from tab_perfil_permisos tpp 
      inner join tab_permisos tp on tp.id = tpp.id_permiso 
      inner join tab_modulos tm on tm.id = tp.id_modulo 
      inner join tab_menus tm2 on tm2.id = tm.id_menu
      inner join tab_usuarios tu ON tu.id_perfil = tpp.id_perfil
      where tpp.id_perfil = $1 and tu.usuario = $2`;
      const resultadoConsulta = await client.query(querySql, [
        idPerfil,
        usuario,
      ]);
      client.release(); // Retorna la conexión al pool cuando hayas terminado
      return { estado: true, respuesta: resultadoConsulta.rows };
    } catch (error) {
      console.log(error);
      return { estado: false, respuesta: error };
    }
  };

}
