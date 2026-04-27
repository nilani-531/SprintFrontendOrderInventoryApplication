import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-inventory-api-display',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './inventory-api-display.html',
  styleUrl: './inventory-api-display.css',
})
export class InventoryApiDisplay {
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
      url.split('/modules/inventory/').length > 1 && url.split('/modules/inventory/')[1].length > 0;
  }

  // List of all inventory API endpoints used in UI
  endpoints = [
    {
      name: 'Get All Inventory',
      method: 'GET',
      route: 'get-all',
      desc: 'Get all inventory details from system database',
    },
    {
      name: 'Get Inventory By ID',
      method: 'GET',
      route: 'get-by-id',
      desc: 'Get inventory details using given inventory ID',
    },
    {
      name: 'Get Inventory By Store',
      method: 'GET',
      route: 'get-by-store',
      desc: 'Get inventory details using given store ID',
    },
    {
      name: 'Get Inventory By Product',
      method: 'GET',
      route: 'get-by-product',
      desc: 'Get inventory details using given product ID',
    },
    {
      name: 'Create Inventory',
      method: 'POST',
      route: 'create',
      desc: 'Create new inventory by providing store, product and quantity details',
    },
    {
      name: 'Update Inventory',
      method: 'PUT',
      route: 'update',
      desc: 'Update existing inventory details using inventory ID',
    },
    {
      name: 'Delete Inventory',
      method: 'DELETE',
      route: 'delete',
      desc: 'Delete inventory record using given inventory ID',
    },
  ];

  isRouteActive(): boolean {
    return this.routeActive;
  }
  goBack() {
    this.router.navigate(['/api-dashboard']);
  }
}
