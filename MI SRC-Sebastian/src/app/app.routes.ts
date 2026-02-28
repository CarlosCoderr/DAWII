import { Routes } from '@angular/router';
import { Helados } from './components/helados/helados';
import { Categorias } from './components/categorias/categorias';
import { Clientes } from './components/clientes/clientes';
import { Ventas } from './components/ventas/ventas';
import { Empleados } from './components/empleados/empleados';

export const routes: Routes = [
  { path: 'helados', component: Helados },
  { path: 'categorias', component: Categorias },
  { path: 'clientes', component: Clientes },
  { path: 'ventas', component: Ventas },
  { path: 'empleados', component: Empleados },
  { path: '', redirectTo: 'helados', pathMatch: 'full' }
];
