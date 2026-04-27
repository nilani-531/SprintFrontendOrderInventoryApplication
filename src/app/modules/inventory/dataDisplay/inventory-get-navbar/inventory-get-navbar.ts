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

  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
