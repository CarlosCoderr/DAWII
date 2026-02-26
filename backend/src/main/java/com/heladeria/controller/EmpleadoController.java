package com.heladeria.controller;

import com.heladeria.model.Empleado;
import com.heladeria.service.EmpleadoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "*")
public class EmpleadoController {

    private final EmpleadoService service;

    public EmpleadoController(EmpleadoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Empleado> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Empleado obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public Empleado crear(@RequestBody Empleado empleado) {
        return service.crear(empleado);
    }

    @PutMapping("/{id}")
    public Empleado actualizar(@PathVariable Integer id, @RequestBody Empleado empleado) {
        return service.actualizar(id, empleado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}