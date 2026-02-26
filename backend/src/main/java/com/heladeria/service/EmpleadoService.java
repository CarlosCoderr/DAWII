package com.heladeria.service;

import com.heladeria.model.Empleado;
import java.util.List;

public interface EmpleadoService {
    List<Empleado> listar();
    Empleado obtener(Integer id);
    Empleado crear(Empleado empleado);
    Empleado actualizar(Integer id, Empleado empleado);
    void eliminar(Integer id);
}