import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-order-items-api-display',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './order-items-api-display.html',
  styleUrl: './order-items-api-display.css',
})
export class OrderItemsApiDisplay {
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
    this.routeActive =
      url.split('/modules/order-items/').length > 1 &&
      url.split('/modules/order-items/')[1].length > 0;
  }

  isRouteActive(): boolean {
    return this.routeActive;
  }

  // List of all order items API endpoints used in UI
  endpoints = [
    {
      name: 'Get Items By Order',
      method: 'GET',
      route: 'get-by-order',
      desc: 'Get all line items for a specific order',
    },
    {
      name: 'Add Item To Order',
      method: 'POST',
      route: 'add-item',
      desc: 'Add a product as a line item to an existing order',
    },
    {
      name: 'Update Line Item',
      method: 'PUT',
      route: 'update-item',
      desc: 'Update quantity or price of a line item in order',
    },
    {
      name: 'Delete Line Item',
      method: 'DELETE',
      route: 'delete-item',
      desc: 'Remove a line item from an order',
    },
  ];
  goBack() {
    this.router.navigate(['/api-dashboard']);
  }
}
