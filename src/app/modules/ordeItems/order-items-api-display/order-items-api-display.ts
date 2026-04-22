import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-order-items-api-display',
  standalone: true,
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './order-items-api-display.html',
  styleUrl: './order-items-api-display.css',
})
export class OrderItemsApiDisplay {

  // List of all order items API endpoints used in UI
  endpoints = [
    { name: 'Get Items By Order', method: 'GET', route: 'get-by-order', desc: 'Get all line items for a specific order' },
    { name: 'Add Item To Order', method: 'POST', route: 'add-item', desc: 'Add a product as a line item to an existing order' },
    { name: 'Update Line Item', method: 'PUT', route: 'update-item', desc: 'Update quantity or price of a line item in order' },
    { name: 'Delete Line Item', method: 'DELETE', route: 'delete-item', desc: 'Remove a line item from an order' },
    { name: 'Get Items By Product', method: 'GET', route: 'get-by-product', desc: 'Get all order items containing a specific product' },
    { name: 'Get Total Quantity', method: 'GET', route: 'total-quantity', desc: 'Get total quantity of a product across all orders' }
  ];
}
