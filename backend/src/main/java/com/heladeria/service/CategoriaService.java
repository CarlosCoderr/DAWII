package com.heladeria.service;

import com.heladeria.model.Categoria;
import java.util.List;

public interface CategoriaService {
    List<Categoria> listar();
    Categoria obtener(Integer id);
    Categoria crear(Categoria categoria);
    Categoria actualizar(Integer id, Categoria categoria);
    void eliminar(Integer id);
}