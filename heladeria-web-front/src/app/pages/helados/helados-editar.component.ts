import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeladoService } from '../../services/helado.service';
import { CategoriaService } from '../../services/categoria.service';
import { Helado } from '../../models/helado';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-helados-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './helados-editar.component.html',
  styleUrls: ['./helados-form.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeladosEditarComponent implements OnInit {
  id: number | null = null;
  nombre = '';
  sabor = '';
  precio: number | null = null;
  stock: number | null = null;
  categoriaId: number | null = null;
  categorias: Categoria[] = [];
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private heladoService: HeladoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    this.cargarCategorias();
    if (this.id) this.cargarHelado(this.id);
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe({
      next: (data) => this.categorias = data,
      error: () => this.error = 'No se pudo cargar categorias.'
    });
  }

  cargarHelado(id: number): void {
    this.cargando = true;
    this.error = '';
    this.heladoService.obtener(id).subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.sabor = data.sabor;
        this.precio = data.precio;
        this.stock = data.stock;
        this.categoriaId = data.categoria?.id ?? null;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el helado.';
        this.cargando = false;
      }
    });
  }

  actualizar(): void {
    const nombreTrim = this.nombre.trim();
    const saborTrim = this.sabor.trim();

    if (!this.id || !nombreTrim || !saborTrim || this.precio == null || this.stock == null || this.categoriaId == null) {
      this.error = 'Completa todos los campos.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const actualizado: Helado = {
      id: this.id,
      nombre: nombreTrim,
      sabor: saborTrim,
      precio: this.precio,
      stock: this.stock,
      categoria: { id: this.categoriaId }
    };

    this.heladoService.actualizar(actualizado).subscribe({
      next: () => {
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo actualizar el helado.';
        this.cargando = false;
      }
    });
  }
}

