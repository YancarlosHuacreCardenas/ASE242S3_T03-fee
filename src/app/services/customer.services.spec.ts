import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  // ⚙️ Cambia localhost si tu backend está desplegado en EC2 o una IP pública
  private apiUrl = "http://localhost:8080/api/customers";


  constructor(private http: HttpClient) {}

  // Listar todos los clientes
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Buscar cliente por ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo cliente
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // Actualizar cliente existente
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  // Eliminación lógica
  deleteCustomer(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  // Restaurar cliente eliminado
  restoreCustomer(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
