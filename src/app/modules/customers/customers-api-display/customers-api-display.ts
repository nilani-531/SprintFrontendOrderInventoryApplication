import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customers-api-display',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './customers-api-display.html',
  styleUrl: './customers-api-display.css',
})
export class CustomersApiDisplay {
  router = inject(Router);
  routeActive = false;

  constructor() {
    this.updateRouteActive(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateRouteActive(event.urlAfterRedirects);
      });
  }

  private updateRouteActive(url: string) {
    const parts = url.split('/modules/customers/');
    this.routeActive = parts.length > 1 && parts[1].length > 0;
  }

  isRouteActive(): boolean {
    return this.routeActive;
  }

  goBack() {
    this.router.navigate(['/api-dashboard']);
  }

  endpoints = [
    {
      name: 'Get All Customers',
      method: 'GET',
      route: 'get-all',
      desc: 'Get all customer records from the database',
    },
    {
      name: 'Get Customer By ID',
      method: 'GET',
      route: 'get-by-customerid',
      desc: 'Find a customer using their ID',
    },
    {
      name: 'Get Customer By Email',
      method: 'GET',
      route: 'get-by-email',
      desc: 'Find a customer using their email address',
    },
    {
      name: 'Create Customer',
      method: 'POST',
      route: 'create',
      desc: 'Add a new customer to the system',
    },
    {
      name: 'Update Customer',
      method: 'PUT',
      route: 'update',
      desc: 'Update an existing customer by ID',
    },
    {
      name: 'Delete Customer',
      method: 'DELETE',
      route: 'delete',
      desc: 'Remove a customer record by ID',
    },
    {
      name: 'Get Customer Orders',
      method: 'GET',
      route: 'get-orders',
      desc: 'Get all orders placed by a customer',
    },
    {
      name: 'Get Customer Shipments',
      method: 'GET',
      route: 'get-shipments',
      desc: 'Get all shipments for a customer',
    },
  ];
}
