import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableSpot } from '../models/table-spot.model';

@Injectable({
  providedIn: 'root'
})
export class TableSpotService {
  // Cambié el puerto a 5000 si tu backend corre ahí, 
  // o déjalo en 8080 si Spring Boot corre en 8080
  private apiUrl = 'http://localhost:8080/api/tables'; // Ajusta el puerto según tu backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<TableSpot[]> {
    return this.http.get<TableSpot[]>(this.apiUrl);
  }

  getById(id: number): Observable<TableSpot> {
    return this.http.get<TableSpot>(`${this.apiUrl}/${id}`);
  }

  create(tableSpot: TableSpot): Observable<TableSpot> {
    return this.http.post<TableSpot>(this.apiUrl, tableSpot);
  }

  update(id: number, tableSpot: TableSpot): Observable<TableSpot> {
    return this.http.put<TableSpot>(`${this.apiUrl}/${id}`, tableSpot);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
