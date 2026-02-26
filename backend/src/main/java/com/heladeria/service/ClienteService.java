package com.heladeria.service;

import com.heladeria.model.Cliente;
import java.util.List;

public interface ClienteService {
    List<Cliente> listar();
    Cliente obtener(Integer id);
    Cliente crear(Cliente cliente);
    Cliente actualizar(Integer id, Cliente cliente);
    void eliminar(Integer id);
}