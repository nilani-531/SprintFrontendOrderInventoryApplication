import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-orders-api-dispaly',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './orders-api-dispaly.html',
  styleUrl: './orders-api-dispaly.css',
})
export class OrdersApiDispaly {
  router = inject(Router);
  routeActive = false;

  // Initializes this component and prepares the dependencies used in the file.
  constructor() {
    this.updateRouteActive(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateRouteActive(event.urlAfterRedirects);
      });
  }

  // Refreshes the active navigation state based on the current route.
  private updateRouteActive(url: string) {
    this.routeActive =
      url.split('/modules/orders/').length > 1 && url.split('/modules/orders/')[1].length > 0;
  }

  // Returns whether the current route matches the selected navigation option.
  isRouteActive(): boolean {
    return this.routeActive;
  }

  // List of all orders API endpoints used in UI
  endpoints = [
    {
      name: 'Get All Orders',
      method: 'GET',
      route: 'get-all',
      desc: 'Get all order details from system database',
    },
    {
      name: 'Get Order By ID',
      method: 'GET',
      route: 'get-by-id',
      desc: 'Get order details using given order ID',
    },
    {
      name: 'Get Orders By Customer',
      method: 'GET',
      route: 'get-by-customer',
      desc: 'Get orders using given customer ID',
    },
    {
      name: 'Get Orders By Store',
      method: 'GET',
      route: 'get-by-store',
      desc: 'Get orders using given store ID',
    },
    {
      name: 'Get Orders By Status',
      method: 'GET',
      route: 'get-by-status',
      desc: 'Get orders using given status',
    },
    {
      name: 'Get Orders By Date Range',
      method: 'GET',
      route: 'get-by-date-range',
      desc: 'Get orders using given date range',
    },
    {
      name: 'Create Order',
      method: 'POST',
      route: 'create',
      desc: 'Create new order by providing customer ID and store ID',
    },
    {
      name: 'Update Order',
      method: 'PUT',
      route: 'update',
      desc: 'Update order customer or store ID',
    },
    {
      name: 'Update Status',
      method: 'PATCH',
      route: 'update-status',
      desc: 'Update only the order status',
    },
    {
      name: 'Delete Order',
      method: 'DELETE',
      route: 'delete',
      desc: 'Delete order record using given order ID',
    },
  ];
  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/api-dashboard']);
  }
}
