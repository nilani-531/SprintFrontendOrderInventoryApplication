// This service handles business logic and API communication for shipments.
// It keeps data operations separate from the UI components.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Shipments Service - Handles all shipment-related API calls
 * Base URL: http://localhost:9090/api/shipments
 * Team Member: Yamini
 */
@Injectable({
  providedIn: 'root',
})
export class ShipmentsService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:9090/api/shipments';

  // Returns the request headers needed for the current backend call.
  /**
   * Get HTTP headers with authentication
   * Uses session storage or fallback credentials
   */
  private getHeaders(): { headers: HttpHeaders; withCredentials: boolean } {
    const auth = sessionStorage.getItem('authCredentials');
    const username = sessionStorage.getItem('loggedInUser') || 'yamini';
    const password = 'yam123';
    const fallback = btoa(username + ':' + password);

    return {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + (auth || fallback),
      }),
      withCredentials: true,
    };
  }

  // Returns all available shipment records from the backend service.
  /**
   * Get all shipments
   * Endpoint: GET /api/shipments
   */
  getAllShipments(): Observable<any> {
    return this.http.get(this.BASE_URL, this.getHeaders());
  }

  // Returns the shipment record that matches the provided identifier.
  /**
   * Get shipment by ID
   * Endpoint: GET /api/shipments/{shipmentId}
   */
  getShipmentById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${id}`, this.getHeaders());
  }

  // Returns filtered shipment records based on the provided search value.
  /**
   * Get shipments by customer
   * Endpoint: GET /api/shipments/customer/{customerId}
   */
  getShipmentsByCustomer(customerId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/customer/${customerId}`,
      this.getHeaders()
    );
  }

  // Returns filtered shipment records based on the provided search value.
  /**
   * Get shipments by store
   * Endpoint: GET /api/shipments/store/{storeId}
   */
  getShipmentsByStore(storeId: number): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/store/${storeId}`,
      this.getHeaders()
    );
  }

  // Returns filtered shipment records based on the provided search value.
  /**
   * Get shipments by status
   * Endpoint: GET /api/shipments/status/{shipmentStatus}
   */
  getShipmentsByStatus(status: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/status/${status}`, this.getHeaders());
  }

  // Sends a request to create a new shipment record with the provided data.
  /**
   * Create a new shipment
   * Endpoint: POST /api/shipments
   * Required fields: customerId, storeId, deliveryAddress
   */
  createShipment(data: any): Observable<any> {
    return this.http.post(this.BASE_URL, data, this.getHeaders());
  }

  // Sends a request to update the selected shipment record with the provided data.
  /**
   * Update an existing shipment
   * Endpoint: PUT /api/shipments/{shipmentId}
   */
  updateShipment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${id}`, data, this.getHeaders());
  }

  // Sends a request to update the selected shipment record with the provided data.
  /**
   * Update shipment status
   * Endpoint: PATCH /api/shipments/{shipmentId}/shipmentStatus
   */
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(
      `${this.BASE_URL}/${id}/shipmentStatus?shipmentStatus=${status}`,
      null,
      this.getHeaders()
    );
  }

  // Sends a request to delete the selected shipment record using its identifier.
  /**
   * Delete a shipment
   * Endpoint: DELETE /api/shipments/{shipmentId}
   */
  deleteShipment(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, this.getHeaders());
  }
}
