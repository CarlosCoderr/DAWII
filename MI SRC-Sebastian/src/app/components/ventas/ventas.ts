import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VentaService } from '../../services/venta';
import { ClienteService } from '../../services/cliente';
import { HeladoService } from '../../services/helado';
import { EmpleadoService } from '../../services/empleado';

import { Venta } from '../../models/venta';
import { DetalleVenta } from '../../models/detalle-venta';
import { Cliente } from '../../models/cliente';
import { Helado } from '../../models/helado';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class Ventas implements OnInit {

  clientes: Cliente[] = [];
  empleados: Empleado[] = [];
  helados: Helado[] = [];
  detalles: DetalleVenta[] = [];
  ventas: Venta[] = [];

  ventaForm!: FormGroup;

  constructor(
    private ventaService: VentaService,
    private clienteService: ClienteService,
    private heladoService: HeladoService,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      cliente: ['', Validators.required],
      empleado: ['', Validators.required],
      helado: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });

    this.cargarDatos();
    this.cargarVentas();
  }

  cargarDatos(): void {
    this.clienteService.getClientes().subscribe(d => this.clientes = [...d]);
    this.heladoService.getHelados().subscribe(d => this.helados = [...d]);
    this.empleadoService.getEmpleados().subscribe(d => this.empleados = [...d]);
  }

  cargarVentas(): void {
    this.ventaService.getVentas().subscribe(d => {
      this.ventas = [...d];
      this.cdr.detectChanges();
    });
  }

  agregarDetalle(): void {
    const helado = this.helados.find(h => h.id == this.ventaForm.value.helado);
    if (!helado) return;

    this.detalles.push({
      helado,
      cantidad: this.ventaForm.value.cantidad,
      precioUnitario: helado.precio
    });

    this.ventaForm.patchValue({ helado: '', cantidad: 1 });
  }

  total(): number {
    return this.detalles.reduce(
      (sum, d) => sum + d.cantidad * d.precioUnitario, 0
    );
  }

  guardarVenta(): void {
    const cliente = this.clientes.find(c => c.id == this.ventaForm.value.cliente);
    const empleado = this.empleados.find(e => e.id == this.ventaForm.value.empleado);
    if (!cliente || !empleado || this.detalles.length === 0) return;

    const venta: Venta = {
      cliente,
      empleado,
      detalles: this.detalles
    };

    this.ventaService.crearVenta(venta).subscribe(() => {
      this.detalles = [];
      this.ventaForm.reset();
      this.cargarVentas();
    });
  }
}
