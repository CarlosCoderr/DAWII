package com.heladeria.service.impl;

import com.heladeria.model.Categoria;
import com.heladeria.repository.CategoriaRepository;
import com.heladeria.service.CategoriaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository repo;
    
    public CategoriaServiceImpl(CategoriaRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Categoria> listar() {
        return repo.findAll();
    }

    @Override
    public Categoria obtener(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada: " + id));
    }

    @Override
    public Categoria crear(Categoria categoria) {
        categoria.setId(null);
        return repo.save(categoria);
    }

    @Override
    public Categoria actualizar(Integer id, Categoria categoria) {
        Categoria db = obtener(id);
        db.setNombre(categoria.getNombre());
        return repo.save(db);
    }

    @Override
    public void eliminar(Integer id) {
        repo.delete(obtener(id));
    }
}