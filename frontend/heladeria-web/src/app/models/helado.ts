export interface Helado {
  id?: number;
  nombre: string;
  sabor: string;
  precio: number;
  stock: number;

  // el backend espera categoria:{id}
  categoria?: { id: number };
}