import { Categoria } from './categoria';

export interface Helado {
  id: number;
  nombre: string;
  sabor: string;
  precio: number;
  stock: number;
  categoria: Categoria;
}
