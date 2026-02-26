import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeladoService } from '../../services/helado.service';
import { CategoriaService } from '../../services/categoria.service';

import { Helado } from '../../models/helado';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './helados.component.html'
})
export class HeladosComponent implements OnInit {

  helados: Helado[] = [];
  categorias: Categoria[] = [];

  // form
  nombre = '';
  sabor = '';
  precio: number | null = null;
  stock: number | null = null;
  categoriaId: number | null = null;

  cargando = false;
  error = '';

  constructor(
    private heladoService: HeladoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarHelados();
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se pudo cargar categorías'
    });
  }

  cargarHelados(): void {
    this.cargando = true;
    this.error = '';
    this.heladoService.listar().subscribe({
      next: (data) => {
        this.helados = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar helados. Verifica backend.';
        this.cargando = false;
      }
    });
  }

  crear(): void {
    const nombreTrim = this.nombre.trim();
    const saborTrim = this.sabor.trim();

    if (!nombreTrim || !saborTrim || this.precio == null || this.stock == null || this.categoriaId == null) {
      this.error = 'Completa todos los campos.';
      return;
    }

    const nuevo: Helado = {
      nombre: nombreTrim,
      sabor: saborTrim,
      precio: this.precio,
      stock: this.stock,
      categoria: { id: this.categoriaId }
    };

    this.heladoService.crear(nuevo).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.cargarHelados();
      },
      error: () => {
        this.error = 'No se pudo crear el helado.';
      }
    });
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar este helado?')) return;

    this.heladoService.eliminar(id).subscribe({
      next: () => this.cargarHelados(),
      error: () => this.error = 'No se pudo eliminar el helado.'
    });
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.sabor = '';
    this.precio = null;
    this.stock = null;
    this.categoriaId = null;
    this.error = '';
  }
}