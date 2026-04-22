import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs';

@Component({
  selector: 'app-customers-api-display',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './customers-api-display.html',
  styleUrl: './customers-api-display.css',
})
export class CustomersApiDisplay {
  router = inject(Router);
  routeActive = false;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.routeActive = url.split('/modules/customers/').length > 1 && url.split('/modules/customers/')[1].length > 0;
    });
  }

  isRouteActive(): boolean {
    return this.routeActive;
  }
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
