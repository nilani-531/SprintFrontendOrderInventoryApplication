import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Order {
  customerId: number;
  storeId: number;
  orderStatusS: string;
  orderTms: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  http: HttpClient = inject(HttpClient);

  getAllOrders() {
    return this.http.get('http://localhost:9090/api/orders');
  }

  getOrderById(orderId: number) {
    return this.http.get(`http://localhost:9090/api/orders/${orderId}`);
  }

  createOrder(order: any) {
    return this.http.post('http://localhost:9090/api/orders', order);
  }

  updateOrderStatus(orderId: number, status: string) {
    return this.http.put(`http://localhost:9090/api/orders/${orderId}/status?status=${status}`, {});
  }

  deleteOrder(orderId: number) {
    return this.http.delete(`http://localhost:9090/api/orders/${orderId}`);
  }

  getOrdersCountByStatus(status: string) {
    return this.http.get(`http://localhost:9090/api/orders/count?status=${status}`);
  }
}
