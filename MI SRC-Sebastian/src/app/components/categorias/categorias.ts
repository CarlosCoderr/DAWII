import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoriaService } from '../../services/categoria';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  templateUrl: './categorias.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias: Categoria[] = [];
  categoriaForm!: FormGroup;
  editando = false;
  categoriaId = 0;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
      this.cdr.detectChanges();
    });
  }

  guardar(): void {
    if (this.categoriaForm.invalid) return;

    const categoria: Categoria = {
      id: this.editando ? this.categoriaId : 0,
      nombre: this.categoriaForm.value.nombre
    };

    if (this.editando) {
      this.categoriaService.actualizarCategoria(this.categoriaId, categoria)
        .subscribe(() => {
          this.resetForm();
          this.cargarCategorias();
        });
    } else {
      this.categoriaService.crearCategoria(categoria)
        .subscribe(() => {
          this.resetForm();
          this.cargarCategorias();
        });
    }
  }

  editar(c: Categoria): void {
    this.editando = true;
    this.categoriaId = c.id;
    this.categoriaForm.setValue({ nombre: c.nombre });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id)
        .subscribe(() => this.cargarCategorias());
    }
  }

  resetForm(): void {
    this.editando = false;
    this.categoriaId = 0;
    this.categoriaForm.reset();
  }
}
