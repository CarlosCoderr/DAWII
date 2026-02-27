import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeladoService } from '../../services/helado.service';
import { Helado } from '../../models/helado';

@Component({
  selector: 'app-helados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './helados.component.html',
  styleUrls: ['./helados.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeladosComponent implements OnInit {
  helados: Helado[] = [];
  cargando = false;
  error = '';

  constructor(private heladoService: HeladoService) {}

  ngOnInit(): void {
    this.cargarHelados();
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

  eliminar(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar este helado?')) return;

    this.heladoService.eliminar(id).subscribe({
      next: () => this.cargarHelados(),
      error: () => this.error = 'No se pudo eliminar el helado.'
    });
  }
}
