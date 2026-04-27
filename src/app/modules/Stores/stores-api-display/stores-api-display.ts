// This component is the main display page for the stores module.
// It connects the module UI with the available API operations.

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';
import { inject } from '@angular/core';

@Component({
  selector: 'app-stores-api-display',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './stores-api-display.html',
  styleUrl: './stores-api-display.css',
})
export class StoresApiDisplay {
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
      url.split('/modules/stores/').length > 1 && url.split('/modules/stores/')[1].length > 0;
  }

  // Returns whether the current route matches the selected navigation option.
  isRouteActive(): boolean {
    return this.routeActive;
  }

  // List of all Stores API endpoints used in UI
  endpoints = [
    {
      name: 'Get All Stores',
      method: 'GET',
      route: 'get-all',
      desc: 'Get all store details from system database',
    },
    {
      name: 'Get Store By ID',
      method: 'GET',
      route: 'get-by-id',
      desc: 'Get store details using given store ID',
    },
    {
      name: 'Get Store By Name',
      method: 'GET',
      route: 'get-by-name',
      desc: 'Get store details using given store name',
    },
    {
      name: 'Get Store Inventory',
      method: 'GET',
      route: 'get-store-inventory',
      desc: 'Get store inventory using given store ID',
    },
    {
      name: 'Get Store Orders',
      method: 'GET',
      route: 'get-store-orders',
      desc: 'Get store orders using given store ID',
    },
    {
      name: 'Get Store Shipments',
      method: 'GET',
      route: 'get-store-shipments',
      desc: 'Get store shipments using given store ID',
    },
    {
      name: 'Create Store',
      method: 'POST',
      route: 'create',
      desc: 'Create new store by providing store name, address and location details',
    },
    {
      name: 'Update Store',
      method: 'PUT',
      route: 'update',
      desc: 'Update existing store details using store ID',
    },
    {
      name: 'Delete Store',
      method: 'DELETE',
      route: 'delete',
      desc: 'Delete store record using given store ID',
    },
  ];
  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/api-dashboard']);
  }
}
