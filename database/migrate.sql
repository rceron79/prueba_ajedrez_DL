DROP TABLE IF EXISTS ajedrez;

--1. Tabla jugadores
CREATE TABLE jugadores (
    id SERIAL, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    nombre VARCHAR(25) NOT NULL, 
    password VARCHAR(100) NOT NULL, 
    anos_experiencia INT NOT NULL, 
    especialidad VARCHAR(50) NOT NULL, 
    foto VARCHAR(255) NOT NULL, 
    estado BOOLEAN NOT NULL DEFAULT FALSE
);

--2. Insertar datos
insert into jugadores (nombre, email, password, anos_experiencia, especialidad, foto, estado)
values 
('pedro', 'pedro@email.com', '123', 8, 'principiante', 'pedro.jpg', false);
('juan', 'juan@email.com', '123', 2, 'aficionado', 'juan.jpg', false);

--3. Tabla partidos pendiente

