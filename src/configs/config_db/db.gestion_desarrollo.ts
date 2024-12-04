// import '../config_server/config.env';
import pg from "pg";
const { Pool } = pg;

const conexionGestionDesarrollo = () => {
  try {
    const conexion = new Pool({
      host: process.env.GESTION_DESARROLLO_HOST,
      port: parseInt(process.env.GESTION_DESARROLLO_PORT || "5432", 10),
      database: process.env.GESTION_DESARROLLO_DB,
      user: process.env.GESTION_DESARROLLO_USER,
      password: process.env.GESTION_DESARROLLO_PASS,
    });
    console.info("conexion exitos a la base de datos");
    return conexion;
  } catch (error) {
    console.error("conexion fallida a la base de datos");
    throw error;
  }
};

export default conexionGestionDesarrollo;
