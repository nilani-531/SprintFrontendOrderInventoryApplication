// This component is the main display page for the products module.
// It connects the module UI with the available API operations.

import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

@Component({
  selector: 'app-products-api-display',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './products-api-display.html',
  styleUrl: './products-api-display.css',
})
export class ProductsApiDisplay {
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
      url.split('/modules/products/').length > 1 && url.split('/modules/products/')[1].length > 0;
  }

  // List of all products API endpoints used in UI
  endpoints = [
    {
      name: 'Get All Products',
      method: 'GET',
      route: 'get-all',
      desc: 'Get all product details from system database',
    },
    {
      name: 'Get Product By ID',
      method: 'GET',
      route: 'get-by-id',
      desc: 'Get product details using given product ID',
    },
    {
      name: 'Create Product',
      method: 'POST',
      route: 'create',
      desc: 'Create new product by providing product details',
    },
    {
      name: 'Update Product',
      method: 'PUT',
      route: 'update',
      desc: 'Update existing product details using product ID',
    },
    {
      name: 'Delete Product',
      method: 'DELETE',
      route: 'delete',
      desc: 'Delete product record using given product ID',
    },
  ];

  // Returns whether the current route matches the selected navigation option.
  isRouteActive(): boolean {
    return this.routeActive;
  }
  // Returns to the previous screen or parent module page.
  goBack() {
    this.router.navigate(['/api-dashboard']);
  }
}
