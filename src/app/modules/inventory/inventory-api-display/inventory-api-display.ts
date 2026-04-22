import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inventory-api-display',
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './inventory-api-display.html',
  styleUrl: './inventory-api-display.css',
})
export class InventoryApiDisplay {
  // List of all inventory API endpoints used in UI
  endpoints = [
    { name: 'Get All Inventory', method: 'GET', route: 'get-all', desc: 'Get all inventory details from system database' },
    { name: 'Get Inventory By ID', method: 'GET', route: 'get-by-id', desc: 'Get inventory details using given inventory ID' },
    { name: 'Create Inventory', method: 'POST', route: 'create', desc: 'Create new inventory by providing store, product and quantity details' },
    { name: 'Update Inventory', method: 'PUT', route: 'update', desc: 'Update existing inventory details using inventory ID' },
    { name: 'Delete Inventory', method: 'DELETE', route: 'delete', desc: 'Delete inventory record using given inventory ID' }
  ];
}
