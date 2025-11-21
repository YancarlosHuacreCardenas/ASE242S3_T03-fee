import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:8080/api/products";

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/activos`);
  }

  getInactiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inactivos`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  restoreProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
