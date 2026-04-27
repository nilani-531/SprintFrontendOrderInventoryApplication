// This component provides local navigation for the inventory module.
// It helps users switch between available operations on the feature page.

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-inventory-get-navbar',
  standalone: true,
  imports: [],
  templateUrl: './inventory-get-navbar.html',
  styleUrl: './inventory-get-navbar.css',
})
export class InventoryGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Inventories' },
    { id: 'getById', label: 'Get Inventory By ID' },
    { id: 'getByStore', label: 'Get Inventory By Store' },
    { id: 'getByProduct', label: 'Get Inventory By Product' },
  ];

  // Stores the selected option and updates the related component state.
  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
