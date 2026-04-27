import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-get-navbar',
  standalone: true,
  imports: [],
  templateUrl: './order-get-navbar.html',
  styleUrl: './order-get-navbar.css',
})
export class OrderGetNavbar {
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Orders' },
    { id: 'getById', label: 'Get Order By ID' },
    { id: 'getByCustomer', label: 'Get Orders By Customer' },
    { id: 'getByStore', label: 'Get Orders By Store' },
    { id: 'getByStatus', label: 'Get Orders By Status' },
    { id: 'getByDateRange', label: 'Get Orders By Date Range' },
  ];

  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
