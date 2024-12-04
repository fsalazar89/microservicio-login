import './configs/config_server/config.env';
import express from "express";
import cors, { CorsOptions } from 'cors';
import { json, urlencoded } from 'body-parser';
import {obtenerCertificados} from './configs/config_server/config.ssl';
import protocoloHttp from 'http';
import protocoloHttps from 'https';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();

// configuracion de cors para controlar desd edonde se consumen los servicios
const allowedOrigins = [`${process.env.ORIGEN}:${process.env.PORT_FRONT}`];
const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Esto permite que las cookies se incluyan en las solicitudes
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// configuracion de header para controlar la seguridad de la aplicacion
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", `${process.env.ORIGEN}`],
        styleSrc: ["'self'", "'unsafe-inline'", `${process.env.ORIGEN}`]
    }
}));
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(json({ limit: process.env.LIMITE_TRANSFERENCIA_DATOS }));
app.use(urlencoded({ limit: process.env.LIMITE_TRANSFERENCIA_DATOS, extended: true }));
app.use(cookieParser());

// Seccion de rutas
import routerInit from './routes/route.init';
app.use(`${process.env.VERSION_APP}`, routerInit);
import routerAuth from './routes/route.auth';
app.use(`${process.env.VERSION_APP}/auth`, routerAuth);
// Fin Seccion de rutas

let server;
if (process.env.PROTOCOLO === 'http') {
  server = protocoloHttp.createServer(app)
} else {
  server = protocoloHttps.createServer(obtenerCertificados(), app)
}

server.listen(process.env.PORT, ()=>{
    console.info(`Ambiente: ${process.env.AMBIENTE}`);
    console.log(`Servidor corriendo en ${process.env.PROTOCOLO}://${process.env.SERVIDOR}:${process.env.PORT}`);
});