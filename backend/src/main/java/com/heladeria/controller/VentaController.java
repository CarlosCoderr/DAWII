package com.heladeria.controller;

import com.heladeria.model.Venta;
import com.heladeria.service.VentaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin(origins = "*")
public class VentaController {

    private final VentaService service;

    public VentaController(VentaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Venta> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Venta obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public Venta crear(@RequestBody Venta venta) {
        // venta debe venir con:
        // cliente{id}, empleado{id}, detalles[{helado{id}, cantidad, precioUnitario?}]
        return service.crearVenta(venta);
    }

    @PostMapping("/{id}/anular")
    public void anular(@PathVariable Integer id) {
        service.anularVenta(id);
    }
}