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

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

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

  getStoreById() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreById(id).subscribe({
      next: (res: any) => { this.singleStore = res.data; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => this.handleError(err),
    });
  }

  getStoreByName() {
    const name = this.storeName.trim();
    if (!name) { this.error = 'Please enter Store Name'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreByName(name).subscribe({
      next: (res: any) => { this.singleStore = res.data; this.loading = false; this.cdr.detectChanges(); },
      error: (err: any) => this.handleError(err),
    });
  }

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
        this.inventoryList = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  getStoreOrders() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreOrders(id).subscribe({
      next: (res: any) => {
        this.ordersList = res.data;
        this.ordersPage = 1;
        this.updatePaginatedOrders();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

  getStoreShipments() {
    const id = this.form.value.storeId;
    if (!id) { this.error = 'Please enter Store ID'; return; }
    this.resetData();
    this.loading = true;
    this.storesService.getStoreShipments(id).subscribe({
      next: (res: any) => {
        this.shipmentsList = res.data;
        this.shipmentsPage = 1;
        this.updatePaginatedShipments();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err),
    });
  }

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

  updatePaginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedStores = this.allStores.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(): number { return Math.ceil(this.allStores.length / this.itemsPerPage); }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginated();
    }
  }

  updatePaginatedOrders() {
    const start = (this.ordersPage - 1) * this.itemsPerPage;
    this.paginatedOrders = this.ordersList.slice(start, start + this.itemsPerPage);
  }

  getOrdersTotalPages(): number { return Math.ceil(this.ordersList.length / this.itemsPerPage); }

  goToOrdersPage(page: number) {
    if (page >= 1 && page <= this.getOrdersTotalPages()) {
      this.ordersPage = page;
      this.updatePaginatedOrders();
    }
  }

  updatePaginatedShipments() {
    const start = (this.shipmentsPage - 1) * this.itemsPerPage;
    this.paginatedShipments = this.shipmentsList.slice(start, start + this.itemsPerPage);
  }

  getShipmentsTotalPages(): number { return Math.ceil(this.shipmentsList.length / this.itemsPerPage); }

  goToShipmentsPage(page: number) {
    if (page >= 1 && page <= this.getShipmentsTotalPages()) {
      this.shipmentsPage = page;
      this.updatePaginatedShipments();
    }
  }

  private handleError(err: any) {
    this.loading = false;
    this.error = err.error?.msg || err.message || 'Something went wrong';
    this.cdr.detectChanges();
  }

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

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
