import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ShipmentsService {
  private baseUrl = 'http://localhost:9090/api/shipments';

  private http = inject(HttpClient);

  // Get all shipments
  getAllShipments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Get shipments by ID
  getShipmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create shipment
  createShipment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Update shipment
  updateShipment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete shipment
  deleteShipment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Update shipment status
  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/shipmentStatus?shipmentStatus=${status}`, null
    );
  }

  // Get shipment By customer ID
  getByCustomerId(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/${customerId}`);
  }

  // Get shipment By store ID
  getByStoreId(storeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/store/${storeId}`);
  }

  // Get shipment By shipment status
  getByStatus(status: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/status/${status}`);
  }
}
