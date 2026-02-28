import { Cliente } from './cliente';
import { DetalleVenta } from './detalle-venta';

export interface Venta {
  id?: number;
  fecha?: string;
  total?: number;
  cliente: Cliente;
  empleado: {
    id: number;
    nombre?: string;
    cargo?: string;
    telefono?: string;
  };
  detalles: DetalleVenta[];
}
