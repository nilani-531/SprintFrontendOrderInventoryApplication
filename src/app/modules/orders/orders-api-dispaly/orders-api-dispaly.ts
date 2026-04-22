import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-orders-api-dispaly',
  standalone: true,
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './orders-api-dispaly.html',
  styleUrl: './orders-api-dispaly.css',
})
export class OrdersApiDispaly {

  // List of all orders API endpoints used in UI
  endpoints = [
    { name: 'Get All Orders', method: 'GET', route: 'get-all', desc: 'Get all order details from system database' },
    { name: 'Get Order By ID', method: 'GET', route: 'get-by-id', desc: 'Get order details using given order ID' },
    { name: 'Create Order', method: 'POST', route: 'create', desc: 'Create new order by providing customer ID and store ID' },
    { name: 'Delete Order', method: 'DELETE', route: 'delete', desc: 'Delete order record using given order ID' },
    { name: 'Update Status', method:'PUT', route: 'update-status', desc: 'Update only the order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)' },
    { name: 'Count By Status', method: 'GET', route: 'count-by-status', desc: 'Get count of orders filtered by current order status' }
  ];
}
