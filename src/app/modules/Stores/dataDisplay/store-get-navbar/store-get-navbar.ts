// This component provides local navigation for the stores module.
// It helps users switch between available operations on the feature page.

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-get-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-get-navbar.html',
  styleUrl: './store-get-navbar.css',
})
export class StoreGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Stores' },
    { id: 'getById', label: 'Get Store By ID' },
    { id: 'getByName', label: 'Get Store By Name' },
    { id: 'getStoreInventory', label: 'Get Store Inventory' },
    { id: 'getStoreOrders', label: 'Get Store Orders' },
    { id: 'getStoreShipments', label: 'Get Store Shipments' },
  ];

  // Stores the selected option and updates the related component state.
  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
