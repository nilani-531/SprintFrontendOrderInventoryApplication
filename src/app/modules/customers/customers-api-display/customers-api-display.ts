import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-customers-api-display',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './customers-api-display.html',
  styleUrl: './customers-api-display.css',
})
export class CustomersApiDisplay {
 endpoints = [
    { name: 'Get All Customers', method: 'GET', route: 'get-all', desc: 'Get all customer details from system database' },
    { name: 'Get Customer By ID', method: 'GET', route: 'get-by-customerid', desc: 'Get customer details using given customer ID' },
    { name: 'Get Customer By Email', method: 'GET', route: 'get-by-email', desc: 'Get customer details using given email address' },
    { name: 'Create Customer', method: 'POST', route: 'create', desc: 'Create new customer by providing required details' },
    { name: 'Update Customer', method: 'PUT', route: 'update', desc: 'Update existing customer details using customer ID' },
    { name: 'Delete Customer', method: 'DELETE', route: 'delete', desc: 'Delete customer record using given customer ID' },
    { name: 'Get Customer Orders', method: 'GET', route: 'get-orders', desc: 'Get all orders placed by customer using customer ID' },
    { name: 'Get Customer Shipments', method: 'GET', route: 'get-shipments', desc: 'Get all shipments associated with customer using customer ID' }
    
  ];
}
