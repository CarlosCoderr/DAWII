package com.heladeria.service;

import com.heladeria.model.Helado;
import java.util.List;

public interface HeladoService {
    List<Helado> listar();
    Helado obtener(Integer id);
    Helado crear(Helado helado);
    Helado actualizar(Integer id, Helado helado);
    void eliminar(Integer id);
}