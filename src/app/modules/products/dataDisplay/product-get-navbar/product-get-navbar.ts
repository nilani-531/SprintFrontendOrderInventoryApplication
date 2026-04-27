// This component provides local navigation for the products module.
// It helps users switch between available operations on the feature page.

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-get-navbar',
  standalone: true,
  imports: [],
  templateUrl: './product-get-navbar.html',
  styleUrl: './product-get-navbar.css',
})
export class ProductGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Products' },
    { id: 'getById', label: 'Get Product By ID' },
  ];

  // Stores the selected option and updates the related component state.
  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
