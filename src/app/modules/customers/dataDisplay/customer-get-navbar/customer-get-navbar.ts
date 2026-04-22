import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../../customers-service';

@Component({
  selector: 'app-customer-get-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-get-navbar.html',
  styleUrl: './customer-get-navbar.css',
})
export class CustomerGetNavbar {
  customersService = inject(CustomersService);
  
  @Output() dataFetched = new EventEmitter<{ type: string; data: any }>();
  @Output() loadingChanged = new EventEmitter<boolean>();
  @Output() errorChanged = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<string>();
  
  selectedOption: string = '';

  getEndpoints = [
    { id: 'getAll', label: 'Get All Customers', requiresInput: false },
    { id: 'getById', label: 'Get by Customer ID', requiresInput: true, inputType: 'customerId' },
    { id: 'getByEmail', label: 'Get by Email', requiresInput: true, inputType: 'email' },
    { id: 'getOrders', label: 'Get Customer Orders', requiresInput: true, inputType: 'customerId' },
    { id: 'getShipments', label: 'Get Customer Shipments', requiresInput: true, inputType: 'customerId' },
  ];

  selectEndpoint(endpointId: string) {
    this.selectedOption = endpointId;
    this.optionSelected.emit(endpointId);
  }
}
