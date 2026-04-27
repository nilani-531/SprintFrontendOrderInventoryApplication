import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Order Items Service - Handles all order item-related API calls
 * Base URL: http://localhost:9090/api/orders/{orderId}/items
 * Team Member: Nilani
 */
@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/orders';

  /**
   * Get HTTP headers with authentication
   * Uses session storage or fallback credentials
   */
  private getHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const auth = sessionStorage.getItem('authCredentials');
    const username = sessionStorage.getItem('loggedInUser') || 'nilani';
    const password = 'nil123';
    const fallback = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + (auth || fallback),
      }),
      withCredentials: true,
    };
  }

  /**
   * Get all items for a specific order
   * Endpoint: GET /api/orders/{orderId}/items
   */
  getItemsByOrderId(orderId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/${orderId}/items`,
      this.getHeaders()
    );
  }

  /**
   * Add a new item to an order
   * Endpoint: POST /api/orders/{orderId}/items
   * Required fields: quantity, unitPrice
   */
  addItemToOrder(orderId: number, productId: number, item: any): Observable<any> {
    return this.http.post(
      `${this.BASE_URL}/${orderId}/items?productId=${productId}`,
      item,
      this.getHeaders()
    );
  }

  /**
   * Update an existing order item
   * Endpoint: PUT /api/orders/{orderId}/items/{lineItemId}
   */
  updateOrderItem(
    orderId: number,
    lineItemId: number,
    item: any
  ): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/${orderId}/items/${lineItemId}`,
      item,
      this.getHeaders()
    );
  }

  /**
   * Delete an order item
   * Endpoint: DELETE /api/orders/{orderId}/items/{lineItemId}
   */
  deleteOrderItem(orderId: number, lineItemId: number): Observable<any> {
    return this.http.delete(
      `${this.BASE_URL}/${orderId}/items/${lineItemId}`,
      this.getHeaders()
    );
  }
}

