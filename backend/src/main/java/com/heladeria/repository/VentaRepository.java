package com.heladeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heladeria.model.Venta;

public interface VentaRepository extends JpaRepository<Venta, Integer> {

}
