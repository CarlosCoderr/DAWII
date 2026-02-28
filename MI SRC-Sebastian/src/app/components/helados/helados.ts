import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeladoService } from '../../services/helado';
import { CategoriaService } from '../../services/categoria';

import { Helado } from '../../models/helado';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-helados',
  standalone: true,
  templateUrl: './helados.html',
  imports: [ReactiveFormsModule, CommonModule],
    styleUrls: ['./helados.css']
})
export class Helados implements OnInit {

  helados: Helado[] = [];
  categorias: Categoria[] = [];

  heladoForm!: FormGroup;
  editando = false;
  heladoId!: number;

  constructor(
    private heladoService: HeladoService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef // 🔑 CLAVE
  ) {}

  ngOnInit(): void {

    this.heladoForm = this.fb.group({
      nombre: ['', Validators.required],
      sabor: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required]
    });

    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;

      // 🔑 CUANDO YA HAY CATEGORÍAS, CARGAMOS HELADOS
      this.cargarHelados();
    });
  }

  cargarHelados(): void {
    this.heladoService.getHelados().subscribe(data => {
      this.helados = data;

      // 🔥 ESTO ELIMINA EL DOBLE CLICK
      this.cdr.detectChanges();
    });
  }

  guardar(): void {
    if (this.heladoForm.invalid) return;

    const helado: any = {
      nombre: this.heladoForm.value.nombre,
      sabor: this.heladoForm.value.sabor,
      precio: this.heladoForm.value.precio,
      stock: this.heladoForm.value.stock,
      categoria: {
        id: this.heladoForm.value.categoriaId
      }
    };

    if (this.editando) {
      this.heladoService.actualizarHelado(this.heladoId, helado)
        .subscribe(() => {
          this.resetForm();
          this.cargarHelados();
        });
    } else {
      this.heladoService.crearHelado(helado)
        .subscribe(() => {
          this.resetForm();
          this.cargarHelados();
        });
    }
  }

  editar(h: Helado): void {
    this.editando = true;
    this.heladoId = h.id;

    this.heladoForm.patchValue({
      nombre: h.nombre,
      sabor: h.sabor,
      precio: h.precio,
      stock: h.stock,
      categoriaId: h.categoria.id
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este helado?')) {
      this.heladoService.eliminarHelado(id)
        .subscribe(() => this.cargarHelados());
    }
  }

  resetForm(): void {
    this.editando = false;
    this.heladoId = 0;
    this.heladoForm.reset();
  }
}

