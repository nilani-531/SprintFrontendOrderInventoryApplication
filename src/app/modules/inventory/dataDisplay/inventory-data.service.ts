import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  private baseUrl = 'http://localhost:9090/inventory';

  constructor(private http: HttpClient) {}

  getInventory(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // This method assumes the backend accepts inventoryId, storeId and productId
  // as path segments. Adjust the URL if your backend uses a different pattern.
  updateInventory(inventoryId: string | number, storeId: string | number, productId: string | number, payload: any): Observable<any> {
    const url = `${this.baseUrl}/${inventoryId}/store/${storeId}/product/${productId}`;
    return this.http.put<any>(url, payload);
  }
}
