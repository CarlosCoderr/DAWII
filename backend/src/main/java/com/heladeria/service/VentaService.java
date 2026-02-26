package com.heladeria.service;

import com.heladeria.model.Venta;

import java.util.List;

public interface VentaService {
    List<Venta> listar();
    Venta obtener(Integer id);

    // REAL: crea venta, calcula total y descuenta stock
    Venta crearVenta(Venta venta);

    // REAL: anula venta, devuelve stock y borra la venta
    void anularVenta(Integer id);
}