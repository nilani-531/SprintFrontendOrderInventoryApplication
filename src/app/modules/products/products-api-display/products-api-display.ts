import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products-api-display',
  imports: [RouterLink, NgFor, RouterOutlet],
  templateUrl: './products-api-display.html',
  styleUrl: './products-api-display.css',
})
export class ProductsApiDisplay {
  // List of all products API endpoints used in UI
  endpoints = [
    { name: 'Get All Products', method: 'GET', route: 'get-all', desc: 'Get all product details from system database' },
    { name: 'Get Product By ID', method: 'GET', route: 'get-by-id', desc: 'Get product details using given product ID' },
    { name: 'Create Product', method: 'POST', route: 'create', desc: 'Create new product by providing product details' },
    { name: 'Update Product', method: 'PUT', route: 'update', desc: 'Update existing product details using product ID' },
    { name: 'Delete Product', method: 'DELETE', route: 'delete', desc: 'Delete product record using given product ID' }
  ];
}
