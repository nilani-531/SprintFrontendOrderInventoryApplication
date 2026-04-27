// This component provides local navigation for the shipments module.
// It helps users switch between available operations on the feature page.

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shipment-get-navbar',
  standalone: true,
  imports: [],
  templateUrl: './shipment-get-navbar.html',
  styleUrl: './shipment-get-navbar.css',
})
export class ShipmentGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Shipments' },
    { id: 'getById', label: 'Get Shipment By ID' },
    { id: 'getByCustomerId', label: 'Get By Customer ID' },
    { id: 'getByStoreId', label: 'Get By Store ID' },
    { id: 'getByStatus', label: 'Get By Status' },
  ];

  // Stores the selected option and updates the related component state.
  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
