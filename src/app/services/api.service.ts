import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private apiUrl = '/api/cars';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Car[]> {
    console.log('🔍 Obteniendo todos los autos...');
    return this.http.get<Car[]>(this.apiUrl).pipe(
      tap(data => console.log('✅ Autos recibidos:', data))
    );
  }

  getById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  create(car: Car): Observable<Car> {
    console.log('➕ Creando auto:', car);
    return this.http.post<Car>(this.apiUrl, car).pipe(
      tap(response => console.log('✅ Auto creado:', response))
    );
  }

  update(id: number, car: Car): Observable<Car> {
    const carSinId = { ...car };
    delete (carSinId as any).id;

    console.log('✏️ Actualizando auto ID:', id, 'Datos:', carSinId);
    return this.http.put<Car>(`${this.apiUrl}/${id}`, carSinId).pipe(
      tap(response => console.log('✅ Auto actualizado:', response))
    );
  }

  delete(id: number): Observable<any> {
    console.log('🗑️ Eliminando auto ID:', id);
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('✅ Auto eliminado:', response))
    );
  }
}