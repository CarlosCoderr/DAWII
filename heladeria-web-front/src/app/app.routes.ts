import { Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { HeladosComponent } from './pages/helados/helados.component';
import { HeladosNuevoComponent } from './pages/helados/helados-nuevo.component';
import { HeladosEditarComponent } from './pages/helados/helados-editar.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HistorialDetalleComponent } from './pages/historial-detalle/historial-detalle.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'helados', component: HeladosComponent },
  { path: 'helados/nuevo', component: HeladosNuevoComponent },
  { path: 'helados/editar/:id', component: HeladosEditarComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'historial-detalle', component: HistorialDetalleComponent },
  { path: '', redirectTo: 'categorias', pathMatch: 'full' }
];
