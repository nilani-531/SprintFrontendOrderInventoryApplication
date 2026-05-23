// This component fetches and displays store records.
// It is used for the read or view operation in this module.

import { Component, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StoresService } from '../../stores-service';
import { StoreGetNavbar } from '../store-get-navbar/store-get-navbar';

interface Store {
  storeId: number;
  storeName: string;
  physicalAddress: string;
  webAddress: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-stores-data-get',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, FormsModule, StoreGetNavbar],
  templateUrl: './stores-data-get.html',
  styleUrl: './stores-data-get.css',
})
export class StoresDataGet {
  form: FormGroup;
  selectedOption = '';
  storeId!: number;
  storeName = '';

  singleStore: Store | null = null;
  allStores: Store[] = [];
  paginatedStores: Store[] = [];

  inventoryList: any[] = [];
  ordersList: any[] = [];
  paginatedOrders: any[] = [];
  shipmentsList: any[] = [];
  paginatedShipments: any[] = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  ordersPage: number = 1;
  shipmentsPage: number = 1;

  loading = false;
  error = '';

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private storesService: StoresService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      storeId: ['', [Validators.min(1)]],
      storeName: [''],
    });
  }

  // Stores the selected option and resets the screen for the next request.
  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  // Checks whether the current input values are valid for the selected request.
  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getByName') return this.storeName.trim().length > 0;
    if (
      ['getById', 'getStoreInventory', 'getStoreOrders', 'getStoreShipments'].includes(
        this.selectedOption,
      )
    ) {
      return !!this.storeId && this.storeId > 0;
    }
    return false;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    if (this.selectedOption === 'getAll') { this.getAllStores(); return; }
    if (this.selectedOption === 'getByName') { this.getStoreByName(); return; }

    this.form.patchValue({ storeId: this.storeId });
    if (this.selectedOption === 'getById') { this.getStoreById(); return; }
    if (this.selectedOption === 'getStoreInventory') { this.getStoreInventory(); return; }
    if (this.selectedOption === 'getStoreOrders') { this.getStoreOrders(); return; }
    if (this.selectedOption === 'getStoreShipments') { this.getStoreShipments(); return; }
  }

  // Returns the store record that matches the provided identifier.
  getStoreById() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreById(id).subscribe({
      next: (res: any) => { this.singleStore = res.data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => this.handleError(err, id),
    });
  }

  // Returns filtered store records based on the provided search value.
  getStoreByName() {
    const name = this.storeName.trim();
    if (!name) { this.error = 'Please enter Store Name'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreByName(name).subscribe({
      next: (res: any) => { this.singleStore = res.data; this.loading = false; this.cdr.detectChanges(); },
      error: (err: any) => this.handleError(err, name),
    });
  }

  // Returns the required store data for the current request.
  getStoreInventory() {
    const id = this.form.value.storeId;
    if (!id) {
      this.error = 'Please enter Store ID';
      return;
    }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreInventory(id).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No inventory data exists for this store id.';
        } else {
          this.inventoryList = res.data;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err, id),
    });
  }

  // Returns the required store data for the current request.
  getStoreOrders() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreOrders(id).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No orders data exists for this store id.';
        } else {
          this.ordersList = res.data;
          this.ordersPage = 1;
          this.updatePaginatedOrders();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err, id),
    });
  }

  // Returns the required store data for the current request.
  getStoreShipments() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreShipments(id).subscribe({
      next: (res: any) => {
        if (!res.data || res.data.length === 0) {
          this.error = 'No shipments data exists for this store id.';
        } else {
          this.shipmentsList = res.data;
          this.shipmentsPage = 1;
          this.updatePaginatedShipments();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err, id),
    });
  }

  // Returns all available store records from the backend service.
  getAllStores() {
    this.resetData();
    this.loading = true;
    this.storesService.getAllStores().subscribe({
      next: (res: any) => {
        this.allStores = res.data;
        this.currentPage = 1;
        this.updatePaginated();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  // Sends a request to update the selected store record with the provided data.
  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedStores = this.allStores.slice(start, start + this.itemsPerPage);
  }

  // Returns the required store data for the current request.
  getTotalPages(): number { return Math.ceil(this.allStores.length / this.itemsPerPage); }

  // Moves to the selected page and refreshes the visible results as needed.
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  // Sends a request to update the selected store record with the provided data.
  updatePaginatedOrders() {
    const start = (this.ordersPage - 1) * this.itemsPerPage;
    this.paginatedOrders = this.ordersList.slice(start, start + this.itemsPerPage);
  }

  // Returns the required store data for the current request.
  getOrdersTotalPages(): number { return Math.ceil(this.ordersList.length / this.itemsPerPage); }

  // Moves to the selected page and refreshes the visible results as needed.
  goToOrdersPage(page: number) {
    if (page >= 1 && page <= this.getOrdersTotalPages()) {
      this.ordersPage = page;
      this.updatePaginatedOrders();
    }
  }

  // Sends a request to update the selected store record with the provided data.
  updatePaginatedShipments() {
    const start = (this.shipmentsPage - 1) * this.itemsPerPage;
    this.paginatedShipments = this.shipmentsList.slice(start, start + this.itemsPerPage);
  }

  // Returns the required store data for the current request.
  getShipmentsTotalPages(): number { return Math.ceil(this.shipmentsList.length / this.itemsPerPage); }

  // Moves to the selected page and refreshes the visible results as needed.
  goToShipmentsPage(page: number) {
    if (page >= 1 && page <= this.getShipmentsTotalPages()) {
      this.shipmentsPage = page;
      this.updatePaginatedShipments();
    }
  }

  // Handles error and updates the related state safely.
  private handleError(err: any, id?: any) {
    this.loading = false;
    let message = err.error?.msg || err.message || 'Something went wrong';
    this.error = message;
    this.cdr.detectChanges();
  }

  // Handles reset data for the current component without changing the workflow.
  resetData() {
    this.error = '';
    this.singleStore = null;
    this.allStores = [];
    this.paginatedStores = [];
    this.inventoryList = [];
    this.ordersList = [];
    this.paginatedOrders = [];
    this.shipmentsList = [];
    this.paginatedShipments = [];
    this.currentPage = 1;
    this.ordersPage = 1;
    this.shipmentsPage = 1;
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
    return message;
  }
}
