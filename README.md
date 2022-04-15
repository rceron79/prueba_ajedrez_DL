# Instrucciones para BD

## En PG, crear BD y tabla:

```
CREATE DATABASE ajedrez;

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
```

### insertar datos en tabla para prueba:
```
insert into jugadores (nombre, email, password, anos_experiencia, especialidad, foto, estado)
values ('pedro', 'pedro@email.com', '123', 8, 'oly', 'hjkjh.jpg', false);
```

