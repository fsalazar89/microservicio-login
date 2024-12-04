## Microservicio Login
Servicio que permite validar si un usuario existe en la base de datos, si esta activo y si las credenciales son correctar se genera un token de jsonwebtoken y muestra informacion del usuario.

## Configuración

1. Clonar el repositorio:
- ```git clone https://github.com/fsalazar89/microservicio-login```

2. Configurar las variables de entorno:

- En la raiz del proyecto hay una carpeta con el nombre environments y dentro de esta carpeta hay un archivo de variables de entrono para desplegar el proyecto en diferentes ambientes (local, pruebas y produccion) cada archivo tiene las siguientes variables.
- AMBIENTE=local
- ZONA_HORARIA=America/Bogota;
- SERVIDOR=localhost
- PROTOCOLO=http
- PORT=XXXX
- PORT_FRONT=XXXX
- VERSION_APP=/api/v1
- ORIGEN=http://localhost
- LIMITE_TRANSFERENCIA_DATOS=5mb
- TOKEN_LOGIN=xxxxxxxxxxxxxxxxxxxxxxxxxx
- SECRET_TOKEN_JWT=xxxxxxxxxxxxxxxxxxxxx
- TOKEN_EXPIRA=1000h
- KEY_ENCRIPT=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
- VI_ENCRIPT=xxxxxxxxxxxxxxxx
- ALGORITMO=aes-256-cbc
- GESTION_DESARROLLO_HOST=xxxxxxxxxx
- GESTION_DESARROLLO_PORT=xxxx
- GESTION_DESARROLLO_DB=xxxxxxxxxxxxxx
- GESTION_DESARROLLO_USER=xxxxxxxxxxxx
- GESTION_DESARROLLO_PASS=xxxxxxxxxxxxx


## Despliegue
1. Entrar a la carpeta del proyecto. ```cd microservicio-login```
2. Instalar dependencias. ```cd microservicio-login```
3. Ejecutar proyecto en local ````npm run local```:


## Consumo de se los servicios "microservicio-login"
* Metodo: POST
* Url: http://localhost:XXXX/api/v1/iniciosesion
* Headers:
```
{
    "authorization":"xxxxxxxxx",
}
```
* Body:
```
{
    "usuario":"xxxxxxx",
    "clave":"xxxxxxx"
}
```

#### NOTA: Proximamente se implementara un control de cambio para desplegar el proyecto desde un contendor de docker