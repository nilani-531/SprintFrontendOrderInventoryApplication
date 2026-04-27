// This component provides local navigation for the order items module.
// It helps users switch between available operations on the feature page.

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-items-get-navbar',
  standalone: true,
  imports: [],
  templateUrl: './order-items-get-navbar.html',
  styleUrl: './order-items-get-navbar.css',
})
export class OrderItemsGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [{ id: 'getByOrder', label: 'Get Items By Order ID' }];

  // Stores the selected option and updates the related component state.
  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
