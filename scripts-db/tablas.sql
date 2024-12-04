---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
----------------------------------- ESQUEMA DE TABLAS ---------------------------------------
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE tab_perfiles (
	id serial PRIMARY KEY NOT NULL UNIQUE,
	nombre varchar(100) NOT NULL
);
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------
CREATE TABLE public.tab_usuarios (
	id serial PRIMARY KEY NOT NULL UNIQUE,
	primer_nombre varchar(50) NOT NULL,
	segundo_nombre varchar(50) NULL,
	primer_apellido varchar(50) NOT NULL,
	segundo_apellido varchar(50) NULL,
	usuario varchar(50) NOT NULL UNIQUE,
	fecha_registro timestamp DEFAULT now() NOT NULL,
	fecha_actualizacion timestamp DEFAULT now() NOT NULL,
	id_perfil int NOT NULL,
	clave varchar(255) NOT NULL,
	clave_temporal bool NOT NULL,
	estado bool NOT NULL,
	foreign key (id_perfil) references tab_perfiles(id)
);
---------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------