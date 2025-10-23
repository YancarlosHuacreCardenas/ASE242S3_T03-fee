import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private apiUrl = "http://localhost:8080/api/customers";

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/agregar`, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/actualizar/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  restoreCustomer(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
