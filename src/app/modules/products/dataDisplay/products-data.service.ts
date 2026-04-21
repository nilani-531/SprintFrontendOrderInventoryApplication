import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  private baseUrl = 'http://localhost:9090/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getProduct(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProduct(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, payload);
  }

  updateProduct(id: string | number, payload: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
  }

  deleteProduct(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
