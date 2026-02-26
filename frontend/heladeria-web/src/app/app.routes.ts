import { Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { HeladosComponent } from './pages/helados/helados.component';

export const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'helados', component: HeladosComponent },
  { path: '', redirectTo: 'categorias', pathMatch: 'full' }
];