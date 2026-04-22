import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  private baseUrl = 'http://localhost:9090/api/products';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const username = 'karthi';
    const password = 'karthi123';

    const auth = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + auth
      }),
      withCredentials: true
    };
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseUrl, this.getHeaders());
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data, this.getHeaders());
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, this.getHeaders());
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}