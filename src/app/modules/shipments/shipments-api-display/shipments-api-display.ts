import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { NgFor, CommonModule } from "@angular/common";
import { filter } from 'rxjs';

@Component({
  selector: 'app-shipments-api-display',
  standalone: true,
  imports: [RouterLink, NgFor, RouterOutlet, CommonModule],
  templateUrl: './shipments-api-display.html',
  styleUrl: './shipments-api-display.css',
})
export class ShipmentsApiDisplay {
  router = inject(Router);
  routeActive = false;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.routeActive = url.split('/modules/shipments/').length > 1 && url.split('/modules/shipments/')[1].length > 0;
    });
  }

  isRouteActive(): boolean {
    return this.routeActive;
  }

  // List of all shipment API endpoints used in UI
   endpoints = [
    { name: 'Get All Shipments', method: 'GET', route: 'get-all', desc: 'Get all shipment details from system database' },
    { name: 'Get Shipment By ID', method: 'GET', route: 'get-by-id', desc: 'Get shipment details using given shipment ID' },
    { name: 'Create Shipment', method: 'POST', route: 'create', desc: 'Create new shipment by providing required details' },
    { name: 'Update Shipment', method: 'PUT', route: 'update', desc: 'Update existing shipment details using shipment ID' },
    { name: 'Delete Shipment', method: 'DELETE', route: 'delete', desc: 'Delete shipment record using given shipment ID' },
    { name: 'Update Status', method:'PATCH', route: 'status', desc: 'Update only the shipment status of record' },
    { name: 'Get By Customer ID', method: 'GET', route: 'get-by-customerId', desc: 'Get shipments based on given customer ID' },
    { name: 'Get By Store ID', method: 'GET', route: 'get-by-storeId', desc: 'Get shipments handled by given store ID' },
    { name: 'Get By Shipment Status', method: 'GET', route: 'get-by-status', desc: 'Get shipments filtered by current shipment status' }
  ];
}
