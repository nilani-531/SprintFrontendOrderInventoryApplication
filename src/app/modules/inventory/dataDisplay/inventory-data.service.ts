import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private baseUrl = 'http://localhost:9090/api/inventory';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const auth = sessionStorage.getItem('authCredentials');
    return {
      headers: new HttpHeaders({
        Authorization: auth ? `Basic ${auth}` : ''
      }),
      withCredentials: true
    };
  }

  getAllInventory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, this.getHeaders());
  }

  getInventory(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.getHeaders());
  }

  getInventoryByStore(storeId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/store/${storeId}`, this.getHeaders());
  }

  getInventoryByProduct(productId: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/product/${productId}`, this.getHeaders());
  }

  createInventory(storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.post<any>(`${this.baseUrl}`, payload, { params, ...this.getHeaders() });
  }

  updateInventory(inventoryId: string | number, storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.put<any>(`${this.baseUrl}/${inventoryId}`, payload, { params, ...this.getHeaders() });
  }

  deleteInventory(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.getHeaders());
  }
}
