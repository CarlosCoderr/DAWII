import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface HistorialVenta {
  id: number;
  fecha: string;
  cliente: string;
  total: number;
}

interface DetalleItem {
  producto: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

@Component({
  selector: 'app-historial-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './historial-detalle.component.html',
  styleUrls: ['./historial-detalle.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistorialDetalleComponent {
  desde = '';
  hasta = '';
  cliente = '';

  historial: HistorialVenta[] = [];

  detalleVentaId: number | null = null;
  detalleTotal = 0;
  detalleItems: DetalleItem[] = [];
}
