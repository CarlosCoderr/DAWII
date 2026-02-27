import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Helado } from '../models/helado';

@Injectable({ providedIn: 'root' })
export class HeladoService {
  private apiUrl = 'http://localhost:8080/api/helados';

  constructor(private http: HttpClient) {}

  listar(): Observable<Helado[]> {
    return this.http.get<Helado[]>(this.apiUrl);
  }

  crear(helado: Helado): Observable<Helado> {
    return this.http.post<Helado>(this.apiUrl, helado);
  }

  obtener(id: number): Observable<Helado> {
    return this.http.get<Helado>(`${this.apiUrl}/${id}`);
  }

  actualizar(helado: Helado): Observable<Helado> {
    if (!helado.id) throw new Error('Helado id requerido para actualizar');
    return this.http.put<Helado>(`${this.apiUrl}/${helado.id}`, helado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
