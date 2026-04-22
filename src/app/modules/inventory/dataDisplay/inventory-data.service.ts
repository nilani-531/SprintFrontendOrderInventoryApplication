import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private baseUrl = 'http://localhost:9090/api/inventory';

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getInventory(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createInventory(storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.post<any>(`${this.baseUrl}`, payload, { params });
  }

  updateInventory(inventoryId: string | number, storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const params = new HttpParams()
      .set('storeId', storeId.toString())
      .set('productId', productId.toString());
    return this.http.put<any>(`${this.baseUrl}/${inventoryId}`, payload, { params });
  }

  deleteInventory(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
