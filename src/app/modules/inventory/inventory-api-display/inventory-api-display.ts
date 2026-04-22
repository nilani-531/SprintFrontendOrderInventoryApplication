import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgFor, CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-inventory-api-display',
  imports: [RouterLink, NgFor, RouterOutlet, CommonModule],
  templateUrl: './inventory-api-display.html',
  styleUrl: './inventory-api-display.css',
})
export class InventoryApiDisplay {
  router = inject(Router);
  routeActive = false;
  
  // List of all inventory API endpoints used in UI
  endpoints = [
    { name: 'Get All Inventory', method: 'GET', route: 'get-all', desc: 'Get all inventory details from system database' },
    { name: 'Get Inventory By ID', method: 'GET', route: 'get-by-id', desc: 'Get inventory details using given inventory ID' },
    { name: 'Create Inventory', method: 'POST', route: 'create', desc: 'Create new inventory by providing store, product and quantity details' },
    { name: 'Update Inventory', method: 'PUT', route: 'update', desc: 'Update existing inventory details using inventory ID' },
    { name: 'Delete Inventory', method: 'DELETE', route: 'delete', desc: 'Delete inventory record using given inventory ID' }
  ];

  constructor() {
    // Subscribe to route changes to update routeActive flag
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      // Check if the URL contains child route (anything after /modules/inventory/)
      this.routeActive = url.split('/modules/inventory/').length > 1 && url.split('/modules/inventory/')[1].length > 0;
    });
  }

  isRouteActive(): boolean {
    return this.routeActive;
  }
}
