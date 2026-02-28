import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Helado } from '../models/helado';

@Injectable({
  providedIn: 'root'
})
export class HeladoService {

  private apiUrl = 'http://localhost:8080/api/helados';

  constructor(private http: HttpClient) {}

  // GET - listar helados
  getHelados(): Observable<Helado[]> {
    return this.http.get<Helado[]>(this.apiUrl);
  }

  // GET - obtener por id
  getHeladoById(id: number): Observable<Helado> {
    return this.http.get<Helado>(`${this.apiUrl}/${id}`);
  }

  // POST - crear helado
  crearHelado(helado: Helado): Observable<Helado> {
    return this.http.post<Helado>(this.apiUrl, helado);
  }

  // PUT - actualizar helado
  actualizarHelado(id: number, helado: Helado): Observable<Helado> {
    return this.http.put<Helado>(`${this.apiUrl}/${id}`, helado);
  }

  // DELETE - eliminar helado
  eliminarHelado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
