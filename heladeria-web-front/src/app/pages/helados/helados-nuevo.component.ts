import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeladoService } from '../../services/helado.service';
import { CategoriaService } from '../../services/categoria.service';
import { Helado } from '../../models/helado';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-helados-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './helados-nuevo.component.html',
  styleUrls: ['./helados-form.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeladosNuevoComponent implements OnInit {
  nombre = '';
  sabor = '';
  precio: number | null = null;
  stock: number | null = null;
  categoriaId: number | null = null;
  categorias: Categoria[] = [];
  cargando = false;
  error = '';

  constructor(
    private heladoService: HeladoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se pudo cargar categorias.'
    });
  }

  guardar(): void {
    const nombreTrim = this.nombre.trim();
    const saborTrim = this.sabor.trim();

    if (!nombreTrim || !saborTrim || this.precio == null || this.stock == null || this.categoriaId == null) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const nuevo: Helado = {
      nombre: nombreTrim,
      sabor: saborTrim,
      precio: this.precio,
      stock: this.stock,
      categoria: { id: this.categoriaId }
    };

    this.heladoService.crear(nuevo).subscribe({
      next: () => {
        this.cargando = false;
        this.limpiar();
      },
      error: () => {
        this.error = 'No se pudo crear el helado.';
        this.cargando = false;
      }
    });
  }

  private limpiar(): void {
    this.nombre = '';
    this.sabor = '';
    this.precio = null;
    this.stock = null;
    this.categoriaId = null;
  }
}

