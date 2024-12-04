import '../configs/config_server/config.env';
import moment from "moment-timezone";
import crypto from 'crypto';

export class Utils {
  private algorithm: string;
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    this.algorithm = process.env.ALGORITMO || 'aes-256-cbc';
    if (!process.env.KEY_ENCRIPT || !process.env.VI_ENCRIPT) {
      throw new Error('Las variables de entorno KEY_ENCRIPT y VI_ENCRIPT deben estar definidas');
    }
    this.key = Buffer.from(process.env.KEY_ENCRIPT, 'utf8');
    this.iv = Buffer.from(process.env.VI_ENCRIPT, 'utf8');
  }

  fechaActualColombia() {
    const fechaHora = moment.tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");
    return fechaHora;
  }

  fechaBrasilAColombia(fechaBransil: any) {
    const fechaBrasil = moment.tz(fechaBransil, "America/Sao_Paulo");
    const fechaColombia = fechaBrasil
      .clone()
      .tz("America/Bogota")
      .format("YYYY-MM-DD HH:mm:ss");
    return fechaColombia;
  }

  sanearDatos = (data: any) => {
    const sanitizedData = JSON.parse(JSON.stringify(data), (key, value) => {
      if (typeof value === "string") {
        // Remueve caracteres especiales y escape para prevenir inyección SQL
        return value.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
          switch (char) {
            case "\0":
              return "\\0";
            case "\x08":
              return "\\b";
            case "\x09":
              return "\\t";
            case "\x1a":
              return "\\z";
            case "\n":
              return "\\n";
            case "\r":
              return "\\r";
            case '"':
            case "'":
            case "\\":
            case "%":
              return "\\" + char; // Escapa el carácter
            default:
              return char;
          }
        });
      }
      return value;
    });

    return sanitizedData;
  };

  encriptarDato = (dato: any) => {
  
    try {
  
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      let encrypted = cipher.update(dato, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
  
    } catch (error) {
  
      return error;
  
    }
  };
  
  desencriptarDato = (dato: any) => {
    
    try {
  
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(dato, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
  
    } catch (error) {
  
      return error;
  
    }
  };

}
