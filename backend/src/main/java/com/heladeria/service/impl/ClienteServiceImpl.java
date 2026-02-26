package com.heladeria.service.impl;

import com.heladeria.model.Cliente;
import com.heladeria.repository.ClienteRepository;
import com.heladeria.service.ClienteService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository repo;
    
    public ClienteServiceImpl(ClienteRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Cliente> listar() {
        return repo.findAll();
    }

    @Override
    public Cliente obtener(Integer id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado: " + id));
    }

    @Override
    public Cliente crear(Cliente cliente) {
        cliente.setId(null);
        return repo.save(cliente);
    }

    @Override
    public Cliente actualizar(Integer id, Cliente cliente) {
        Cliente db = obtener(id);
        db.setNombre(cliente.getNombre());
        db.setTelefono(cliente.getTelefono());
        return repo.save(db);
    }

    @Override
    public void eliminar(Integer id) {
        repo.delete(obtener(id));
    }
}