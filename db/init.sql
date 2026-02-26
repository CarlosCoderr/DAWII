CREATE DATABASE IF NOT EXISTS Helado2025;
USE Helado2025;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE helados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  sabor VARCHAR(100) NOT NULL,
  precio DECIMAL(8,2) NOT NULL,
  stock INT NOT NULL,
  categoria_id INT NULL,
  CONSTRAINT fk_helados_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20)
);

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cargo VARCHAR(50),
  telefono VARCHAR(20)
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME,
  total DECIMAL(10,2),
  cliente_id INT,
  empleado_id INT,
  CONSTRAINT fk_ventas_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  CONSTRAINT fk_ventas_empleado
    FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE detalle_ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  helado_id INT,
  cantidad INT,
  precio_unitario DECIMAL(8,2),
  CONSTRAINT fk_detalle_venta
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
  CONSTRAINT fk_detalle_helado
    FOREIGN KEY (helado_id) REFERENCES helados(id)
);