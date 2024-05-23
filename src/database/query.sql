CREATE DATABASE Prueba;
USE Prueba;
CREATE TABLE mensajes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    remitente VARCHAR(50) NOT NULL,
    mensaje_corto VARCHAR(320) NOT NULL,
    receptor VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL,
    asunto VARCHAR(100)
);

SELECT * FROM mensajes;