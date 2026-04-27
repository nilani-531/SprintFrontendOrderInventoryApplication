import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Orders Service - Handles all order-related API calls
 * Base URL: http://localhost:9090/api/orders
 * Team Member: Nilani
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
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
   * Get all orders
   * Endpoint: GET /api/orders
   */
  getAllOrders(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  /**
   * Get order by ID
   * Endpoint: GET /api/orders/{orderId}
   */
  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${orderId}`, this.getHeaders());
  }

  /**
   * Get orders by customer
   * Endpoint: GET /api/orders/customer/{customerId}
   */
  getOrdersByCustomer(customerId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/customer/${customerId}`,
      this.getHeaders()
    );
  }

  /**
   * Get orders by store
   * Endpoint: GET /api/orders/store/{storeId}
   */
  getOrdersByStore(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/store/${storeId}`,
      this.getHeaders()
    );
  }

  /**
   * Get orders by status
   * Endpoint: GET /api/orders/status/{status}
   */
  getOrdersByStatus(status: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/status/${status}`,
      this.getHeaders()
    );
  }

  /**
   * Get order count by status
   * Endpoint: GET /api/orders/count
   */
  getOrderCount(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/count`, this.getHeaders());
  }

  /**
   * Get orders by date range
   * Endpoint: GET /api/orders/date-range
   */
  getOrdersByDateRange(from: string, to: string): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/date-range?from=${from}&to=${to}`,
      this.getHeaders()
    );
  }

  /**
   * Create a new order
   * Endpoint: POST /api/orders
   * Required fields: customerId, storeId
   */
  createOrder(order: any): Observable<any> {
    return this.http.post(this.BASE_URL, order, this.getHeaders());
  }

  /**
   * Update order storeId or customerId
   * Endpoint: PUT /api/orders/{orderId}?storeId=X or ?customerId=X
   * Backend uses @RequestParam
   */
  updateOrder(orderId: number, order: any): Observable<any> {
    let params = new HttpParams();
    if (order.storeId) params = params.set('storeId', order.storeId);
    if (order.customerId) params = params.set('customerId', order.customerId);
    return this.http.put(`${this.BASE_URL}/${orderId}`, {}, { ...this.getHeaders(), params });
  }

  /**
   * Update order timestamp (orderTms)
   * Endpoint: PUT /api/orders/{orderId}?orderTms=2023-01-18T18:30:00
   * Spring @DateTimeFormat(iso = ISO.DATE_TIME) requires full seconds: T18:30:00
   */
  updateOrderTms(orderId: number, orderTms: string): Observable<any> {
    let params = new HttpParams().set('orderTms', orderTms);
    return this.http.put(`${this.BASE_URL}/${orderId}`, {}, { ...this.getHeaders(), params });
  }

  /**
   * Update order status
   * Endpoint: PATCH /api/orders/{orderId}/status
   */
  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(
      `${this.BASE_URL}/${orderId}/status?status=${status}`,
      {},
      this.getHeaders()
    );
  }

  /**
   * Delete an order
   * Endpoint: DELETE /api/orders/{orderId}
   */
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${orderId}`, this.getHeaders());
  }
}
