import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface OrderItem {
  lineItemId: number;
  orderId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  http: HttpClient = inject(HttpClient);

  // Create new order item
  createOrderItem(item: any) {
    return this.http.post(
      `http://localhost:9090/api/order-items`,
      item
    );
  }

  getAllItems() {
    return this.http.get(`http://localhost:9090/api/order-items`);
  }

  getItemsByOrderId(orderId: number) {
    return this.http.get(`http://localhost:9090/api/order-items/order/${orderId}`);
  }

  updateItem(orderId: number, lineItemId: number, item: any) {
    return this.http.put(
      `http://localhost:9090/api/order-items/${orderId}/item/${lineItemId}`,
      item
    );
  }

  patchItem(lineItemId: number, item: any) {
    return this.http.patch(
      `http://localhost:9090/api/order-items/${lineItemId}`,
      item
    );
  }

  deleteItem(orderId: number, lineItemId: number) {
    return this.http.delete(
      `http://localhost:9090/api/order-items/${orderId}?lineItemId=${lineItemId}`
    );
  }

  getItemsByProductId(productId: number) {
    return this.http.get(
      `http://localhost:9090/api/order-items/products/${productId}`
    );
  }

  getTotalQuantityByProductId(productId: number) {
    return this.http.get(
      `http://localhost:9090/api/order-items/products/${productId}/quantity`
    );
  }
}

