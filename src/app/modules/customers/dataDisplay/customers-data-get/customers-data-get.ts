import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from './../../customers-service';
import { CustomerGetNavbar } from '../customer-get-navbar/customer-get-navbar';


@Component({
  selector: 'app-customers-data-get',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomerGetNavbar],
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
    { id: 'getShipments', label: 'Get Customer Shipments', requiresInput: true, inputType: 'customerId' },
  ];

  isInputValid(): boolean {
    const endpoint = this.getEndpoints.find(e => e.id === this.selectedOption);
    if (!endpoint?.requiresInput) return true;
    
    if (endpoint?.inputType === 'customerId') {
      return this.customerId !== null && this.customerId > 0;
    }
    if (endpoint?.inputType === 'email') {
      return !!this.emailAddress && this.emailAddress.trim().length > 0;
    }
    return false;
  }

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
        this.errorMessage = 'Error fetching data: ' + (err.message || 'Unknown error');
        this.loading = false;
      },
    });
  }

  onOptionSelected(option: string) {
    this.selectedOption = option;
  }

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

  onErrorChanged(error: string) {
    this.errorMessage = error;
  }

  // Pagination methods
  updatePaginatedCustomers() {
    const start = (this.currentCustomerPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(start, end);
  }

  updatePaginatedOrders() {
    const start = (this.currentOrderPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(start, end);
  }

  updatePaginatedShipments() {
    const start = (this.currentShipmentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedShipments = this.shipments.slice(start, end);
  }

  getTotalCustomerPages(): number {
    return Math.ceil(this.customers.length / this.itemsPerPage);
  }

  getTotalOrderPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }

  getTotalShipmentPages(): number {
    return Math.ceil(this.shipments.length / this.itemsPerPage);
  }

  goToCustomerPage(page: number) {
    if (page >= 1 && page <= this.getTotalCustomerPages()) {
      this.currentCustomerPage = page;
      this.updatePaginatedCustomers();
    }
  }

  goToOrderPage(page: number) {
    if (page >= 1 && page <= this.getTotalOrderPages()) {
      this.currentOrderPage = page;
      this.updatePaginatedOrders();
    }
  }

  goToShipmentPage(page: number) {
    if (page >= 1 && page <= this.getTotalShipmentPages()) {
      this.currentShipmentPage = page;
      this.updatePaginatedShipments();
    }
  }
iserror:boolean=false;
issuccess:boolean=false;

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
      error: (err) => console.error(err)
       
    }); 
  }

  // ✅ Get By ID
  getCustomerById() {
    if (!this.customerId || this.customerId <= 0) {
      alert("Enter valid ID");
      return;
    }

    this.reset();

    this.customersService.getCustomerById(this.customerId).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
    });
  }

  // ✅ Get By Email
  getCustomerByEmail() {
    if (!this.emailAddress) {
      alert("Enter email");
      return;
    }

    this.reset();

    this.customersService.getCustomerByEmail(this.emailAddress).subscribe({
      next: (data: any) => {
        this.customer = data.data ? data.data : data;
        this.change.detectChanges();
      },
      error: (err) => this.handleError(err)
    });
  }

  // ✅ Get Orders
  getOrders() {
    if (!this.customerId || this.customerId <= 0) {
    alert("Enter valid Customer ID first");
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
      error: (err) => this.handleError(err)
      
    });
  }

  // ✅ Get Shipments
  getShipments() {
    if (!this.customerId || this.customerId <= 0) {
    alert("Enter valid Customer ID first");
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
      error: (err) => this.handleError(err)
    });
  }

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

  // 🔥 Error Handler
  handleError(err: any) {
    console.log("Status:", err.status);

    if (err.status === 404) {
      this.errorMessage = "Resource not found";
    } else if (err.status === 500) {
      this.errorMessage = "Server error";
    } else {
      this.errorMessage = "Something went wrong";
    }
 
  }

resetListsOnly() {
  this.orders = [];
  this.shipments = [];
  this.paginatedOrders = [];
  this.paginatedShipments = [];
  this.errorMessage = '';
}

}


