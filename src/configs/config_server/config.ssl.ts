const fs = require("fs");
const path = require("path");

export const obtenerCertificados = () => {
  const sslPath = process.env.CERTIFICATES_SSL_PATH;
  const privateKey = fs.readFileSync(
    path.join(sslPath, "flamingo.key"),
    "utf8"
  );
  const certificate = fs.readFileSync(
    path.join(sslPath, "flamingo.crt"),
    "utf8"
  );
  return { key: privateKey, cert: certificate };
};
