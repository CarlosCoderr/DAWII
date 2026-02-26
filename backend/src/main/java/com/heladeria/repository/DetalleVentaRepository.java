package com.heladeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heladeria.model.DetalleVenta;

public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Integer> {

}
