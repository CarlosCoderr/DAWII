package com.heladeria.controller;

import com.heladeria.model.Helado;
import com.heladeria.service.HeladoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/helados")
@CrossOrigin(origins = "*")
public class HeladoController {

    private final HeladoService service;

    public HeladoController(HeladoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Helado> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Helado obtener(@PathVariable Integer id) {
        return service.obtener(id);
    }

    @PostMapping
    public Helado crear(@RequestBody Helado helado) {
        return service.crear(helado);
    }

    @PutMapping("/{id}")
    public Helado actualizar(@PathVariable Integer id, @RequestBody Helado helado) {
        return service.actualizar(id, helado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}