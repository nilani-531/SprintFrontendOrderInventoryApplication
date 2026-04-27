// This component fetches and displays customer records.
// It is used for the read or view operation in this module.

import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from './../../customers-service';
import { CustomerGetNavbar } from '../customer-get-navbar/customer-get-navbar';

@Component({
  selector: 'app-customers-data-get',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CustomerGetNavbar],
  templateUrl: './customers-data-get.html',
  styleUrl: './customers-data-get.css',
})
export class CustomersDataGet {
  @ViewChild('navbar') navbar!: CustomerGetNavbar;
  selectedOption: string = '';

  customersService = inject(CustomersService);
  change = inject(ChangeDetectorRef);

  // Data arrays
  customers: any[] = [];
  customer: any = null;
  orders: any[] = [];
  shipments: any[] = [];

  // Pagination properties
  itemsPerPage: number = 10;
  currentCustomerPage: number = 1;
  currentOrderPage: number = 1;
  currentShipmentPage: number = 1;

  // Paginated display arrays
  paginatedCustomers: any[] = [];
  paginatedOrders: any[] = [];
  paginatedShipments: any[] = [];

  customerId!: number;
  emailAddress!: string;
  errorMessage: string = '';
  loading: boolean = false;

  getEndpoints = [
    { id: 'getAll', label: 'Get All Customers', requiresInput: false },
    { id: 'getById', label: 'Get by Customer ID', requiresInput: true, inputType: 'customerId' },
    { id: 'getByEmail', label: 'Get by Email', requiresInput: true, inputType: 'email' },
    { id: 'getOrders', label: 'Get Customer Orders', requiresInput: true, inputType: 'customerId' },
    {
      id: 'getShipments',
      label: 'Get Customer Shipments',
      requiresInput: true,
      inputType: 'customerId',
    },
  ];

  // Checks whether the current input values are valid for the selected request.
  isInputValid(): boolean {
    const endpoint = this.getEndpoints.find((e) => e.id === this.selectedOption);
    if (!endpoint?.requiresInput) return true;

    if (endpoint?.inputType === 'customerId') {
      return this.customerId !== null && this.customerId > 0;
    }
    if (endpoint?.inputType === 'email') {
      return !!this.emailAddress && this.emailAddress.trim().length > 0;
    }
    return false;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.errorMessage = 'Please provide valid input';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    let request;
    switch (this.selectedOption) {
      case 'getAll':
        request = this.customersService.getAllCustomers();
        break;
      case 'getById':
        request = this.customersService.getCustomerById(this.customerId!);
        break;
      case 'getByEmail':
        request = this.customersService.getCustomerByEmail(this.emailAddress);
        break;
      case 'getOrders':
        request = this.customersService.getCustomerOrders(this.customerId!);
        break;
      case 'getShipments':
        request = this.customersService.getCustomerShipments(this.customerId!);
        break;
      default:
        this.errorMessage = 'Invalid endpoint selected';
        this.loading = false;
        return;
    }

    request.subscribe({
      next: (response) => {
        this.loading = false;
        this.errorMessage = '';
        this.onDataFetched({ type: this.selectedOption, data: response });
      },
      error: (err) => {
        this.loading = false;
        this.handleError(err);
        this.change.detectChanges();
      },
    });
  }

  // Stores the selected option and resets the screen for the next request.
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.reset();
  }

  // Stores the returned API data and updates the visible screen sections.
  // Handle data from navbar
  onDataFetched(event: { type: string; data: any }) {
    this.reset();
    const { type, data } = event;
    const processedData = data.data ? data.data : data;

    switch (type) {
      case 'getAll':
        this.customers = Array.isArray(processedData) ? processedData : [processedData];
        this.currentCustomerPage = 1;
        this.updatePaginatedCustomers();
        break;
      case 'getById':
      case 'getByEmail':
        this.customer = processedData;
        break;
      case 'getOrders':
        this.orders = Array.isArray(processedData) ? processedData : [processedData];
        this.currentOrderPage = 1;
        this.updatePaginatedOrders();
        break;
      case 'getShipments':
        this.shipments = Array.isArray(processedData) ? processedData : [processedData];
        this.currentShipmentPage = 1;
        this.updatePaginatedShipments();
        break;
    }
    this.change.detectChanges();
  }

  // Updates the visible error message when the child component reports a change.
  onErrorChanged(error: string) {
    this.errorMessage = error;
  }

  // Sends a request to update the selected customer record with the provided data.
  // Pagination methods
  updatePaginatedCustomers() {
    const start = (this.currentCustomerPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(start, end);
  }

  // Sends a request to update the selected customer record with the provided data.
  updatePaginatedOrders() {
    const start = (this.currentOrderPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(start, end);
  }

  // Sends a request to update the selected customer record with the provided data.
  updatePaginatedShipments() {
    const start = (this.currentShipmentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedShipments = this.shipments.slice(start, end);
  }

  // Returns the required customer data for the current request.
  getTotalCustomerPages(): number {
    return Math.ceil(this.customers.length / this.itemsPerPage);
  }

  // Returns the required customer data for the current request.
  getTotalOrderPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  // Returns the required customer data for the current request.
  getTotalShipmentPages(): number {
    return Math.ceil(this.shipments.length / this.itemsPerPage);
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToCustomerPage(page: number) {
    if (page >= 1 && page <= this.getTotalCustomerPages()) {
      this.currentCustomerPage = page;
      this.updatePaginatedCustomers();
    }
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToOrderPage(page: number) {
    if (page >= 1 && page <= this.getTotalOrderPages()) {
      this.currentOrderPage = page;
      this.updatePaginatedOrders();
    }
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToShipmentPage(page: number) {
    if (page >= 1 && page <= this.getTotalShipmentPages()) {
      this.currentShipmentPage = page;
      this.updatePaginatedShipments();
    }
  }
  iserror: boolean = false;
  issuccess: boolean = false;

  // Returns all available customer records from the backend service.
  //  Get All Customers
  getAllCustomers() {
    this.reset();

    this.customersService.getAllCustomers().subscribe({
      next: (data: any) => {
        this.customers = data.data ? data.data : data;
        this.currentCustomerPage = 1;
        this.updatePaginatedCustomers();
        this.change.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  // Returns the customer record that matches the provided identifier.
  // ✅ Get By ID
  getCustomerById() {
    if (!this.customerId || this.customerId <= 0) {
      alert('Enter valid ID');
      return;
    }

    this.reset();

    this.customersService.getCustomerById(this.customerId).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  // Returns filtered customer records based on the provided search value.
  // ✅ Get By Email
  getCustomerByEmail() {
    if (!this.emailAddress) {
      alert('Enter email');
      return;
    }

    this.reset();

    this.customersService.getCustomerByEmail(this.emailAddress).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  // Returns the required customer data for the current request.
  // ✅ Get Orders
  getOrders() {
    if (!this.customerId || this.customerId <= 0) {
      alert('Enter valid Customer ID first');
      return;
    }
    this.resetListsOnly();

    this.customersService.getCustomerOrders(this.customerId).subscribe({
      next: (data: any) => {
        this.orders = data.data ? data.data : data;
        this.currentOrderPage = 1;
        this.updatePaginatedOrders();
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  // Returns the required customer data for the current request.
  // ✅ Get Shipments
  getShipments() {
    if (!this.customerId || this.customerId <= 0) {
      alert('Enter valid Customer ID first');
      return;
    }
    this.resetListsOnly();

    this.customersService.getCustomerShipments(this.customerId).subscribe({
      next: (data: any) => {
        this.shipments = data.data ? data.data : data;
        this.currentShipmentPage = 1;
        this.updatePaginatedShipments();
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  // Clears the current component state and prepares the screen for a fresh action.
  // 🔥 Common Reset
  reset() {
    this.customers = [];
    this.customer = null;
    this.orders = [];
    this.shipments = [];
    this.paginatedCustomers = [];
    this.paginatedOrders = [];
    this.paginatedShipments = [];
    this.currentCustomerPage = 1;
    this.currentOrderPage = 1;
    this.currentShipmentPage = 1;
    this.errorMessage = '';
  }

  // Handles error and updates the related state safely.
  // 🔥 Error Handler
  handleError(err: any) {
    console.log('Status:', err.status);

    this.reset();

    if (err.status === 404) {
      this.errorMessage = err.error?.msg || err.error?.message || 'Resource not found';
    } else if (err.status === 500) {
      this.errorMessage = err.error?.msg || err.error?.message || 'Server error';
    } else {
      this.errorMessage = err.error?.msg || err.error?.message || 'Something went wrong';
    }

    this.change.detectChanges();
  }
  // Handles reset lists only for the current component without changing the workflow.
  resetListsOnly() {
    this.orders = [];
    this.shipments = [];
    this.paginatedOrders = [];
    this.paginatedShipments = [];
    this.errorMessage = '';
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}