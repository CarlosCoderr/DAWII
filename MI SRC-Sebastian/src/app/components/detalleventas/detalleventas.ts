import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleVentaService } from '../../services/detalle-venta';
import { DetalleVenta } from '../../models/detalle-venta';

@Component({
  selector: 'app-detalleventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalleventas.html',
  styleUrls: ['./detalleventas.css']
})
export class DetalleVentasComponent implements OnInit {

  detalles: DetalleVenta[] = [];

  constructor(private detalleVentaService: DetalleVentaService) {}

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.detalleVentaService.getDetalleVentas()
      .subscribe(d => this.detalles = d);
  }

  totalDetalle(d: DetalleVenta): number {
    return d.cantidad * d.precioUnitario;
  }
}
