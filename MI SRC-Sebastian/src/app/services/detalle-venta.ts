import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleVenta } from '../models/detalle-venta';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  private apiUrl = 'http://localhost:8080/detalle-ventas';

  constructor(private http: HttpClient) {}

  getDetalleVentas(): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(this.apiUrl);
  }
}
