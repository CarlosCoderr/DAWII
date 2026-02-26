import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.component.html'
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  nombre = '';
  cargando = false;
  error = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.categoriaService.listar().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar categorías. Verifica que el backend esté corriendo.';
        this.cargando = false;
      }
    });
  }

  crear(): void {
    const nombreTrim = this.nombre.trim();
    if (!nombreTrim) return;

    this.categoriaService.crear({ nombre: nombreTrim }).subscribe({
      next: () => {
        this.nombre = '';
        this.cargar();
      },
      error: () => {
        this.error = 'No se pudo crear la categoría.';
      }
    });
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar esta categoría?')) return;

    this.categoriaService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'No se pudo eliminar. Puede estar relacionada a helados.';
      }
    });
  }
}