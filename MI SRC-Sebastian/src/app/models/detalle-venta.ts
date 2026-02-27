import { Helado } from './helado';

export interface DetalleVenta {
  id?: number;
  helado: Helado;
  cantidad: number;
  precioUnitario: number;
}
