package com.heladeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heladeria.model.Helado;

public interface HeladoRepository extends JpaRepository<Helado, Integer> {

}
