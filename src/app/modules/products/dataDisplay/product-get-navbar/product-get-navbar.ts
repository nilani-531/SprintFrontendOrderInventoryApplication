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

  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
