import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  nombre = '';
  telefono = '';
  busqueda = '';
  cargando = false;
  error = '';
  editandoId: number | null = null;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  get clientesFiltrados(): Cliente[] {
    const filtro = this.busqueda.trim().toLowerCase();
    if (!filtro) return this.clientes;
    return this.clientes.filter((cliente) => {
      const nombre = cliente.nombre?.toLowerCase() ?? '';
      const telefono = cliente.telefono?.toLowerCase() ?? '';
      return nombre.includes(filtro) || telefono.includes(filtro);
    });
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.clienteService.listar().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar clientes. Verifica backend.';
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.editandoId = null;
    this.limpiarFormulario();
  }

  editar(cliente: Cliente): void {
    this.editandoId = cliente.id ?? null;
    this.nombre = cliente.nombre;
    this.telefono = cliente.telefono;
    this.error = '';
  }

  guardar(): void {
    const nombreTrim = this.nombre.trim();
    const telefonoTrim = this.telefono.trim();

    if (!nombreTrim || !telefonoTrim) {
      this.error = 'Completa nombre y telefono.';
      return;
    }

    const payload: Cliente = {
      id: this.editandoId ?? undefined,
      nombre: nombreTrim,
      telefono: telefonoTrim
    };

    if (this.editandoId) {
      this.clienteService.actualizar(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.editandoId = null;
          this.cargar();
        },
        error: () => {
          this.error = 'No se pudo actualizar el cliente.';
        }
      });
      return;
    }

    this.clienteService.crear(payload).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.cargar();
      },
      error: () => {
        this.error = 'No se pudo crear el cliente.';
      }
    });
  }

  eliminar(id?: number): void {
    if (!id) return;
    if (!confirm('Eliminar este cliente?')) return;

    this.clienteService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'No se pudo eliminar el cliente.';
      }
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.nombre = '';
    this.telefono = '';
    this.error = '';
  }
}
