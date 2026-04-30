// This component fetches and displays inventory records.
// It is used for the read or view operation in this module.

import { Component, ChangeDetectorRef, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InventoryGetNavbar } from '../inventory-get-navbar/inventory-get-navbar';
import { InventoryDataService } from '../inventory-data.service';

interface Inventory {
  inventoryId: number;
  storeId?: number | string;
  productId?: number | string;
  productInventory: number;
}

@Component({
  selector: 'app-inventory-data-get',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InventoryGetNavbar],
  templateUrl: './inventory-data-get.html',
  styleUrl: './inventory-data-get.css',
})
export class InventoryDataGet {
  form: FormGroup;
  selectedOption = '';
  inventoryId!: number;
  storeId!: number;
  productId!: number;

  singleInventory: Inventory | null = null;
  allInventories: Inventory[] = [];
  paginatedInventories: Inventory[] = [];

  // Pagination properties
  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/inventory';

  private inventoryService = inject(InventoryDataService);

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      inventoryId: ['', [Validators.min(1)]],
      storeId: ['', [Validators.min(1)]],
      productId: ['', [Validators.min(1)]],
    });
  }

  // Runs when the component loads and prepares the initial data and screen state.
  ngOnInit() {
    this.route.url.subscribe((segments) => {
      if (segments.length > 0) {
        const path = segments[segments.length - 1].path;
        if (path === 'get-all') this.selectedOption = 'getAll';
        else if (path === 'get-by-id') this.selectedOption = 'getById';
        else if (path === 'get-by-store') this.selectedOption = 'getByStore';
        else if (path === 'get-by-product') this.selectedOption = 'getByProduct';
      }
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
    if (this.selectedOption === 'getById') return !!this.inventoryId && this.inventoryId > 0;
    if (this.selectedOption === 'getByStore') return !!this.storeId && this.storeId > 0;
    if (this.selectedOption === 'getByProduct') return !!this.productId && this.productId > 0;
    return false;
  }

  // Calls the selected API endpoint and updates the screen with the response.
  fetchData() {
    if (!this.isInputValid()) {
      this.error = 'Please provide valid input';
      return;
    }
    if (this.selectedOption === 'getAll') {
      this.getAllInventories();
      return;
    }
    if (this.selectedOption === 'getById') {
      this.form.patchValue({ inventoryId: this.inventoryId });
      this.getInventoryById();
    } else if (this.selectedOption === 'getByStore') {
      this.getInventoryByStore();
    } else if (this.selectedOption === 'getByProduct') {
      this.getInventoryByProduct();
    }
  }

  // Returns the inventory record that matches the provided identifier.
  // 🔹 Get Inventory by ID
  getInventoryById() {
    const id = this.form.value.inventoryId;

    this.resetData();
    this.loading = true;

    this.inventoryService.getInventory(id).subscribe({
      next: (res) => {
        if (!res.data) {
          this.error = `No data found (ID: ${id})`;
        } else {
          this.singleInventory = res.data;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = this.extractErrorMessage(err, id);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns all available inventory records from the backend service.
  // 🔹 Get All Inventories
  getAllInventories() {
    this.resetData();
    this.loading = true;

    this.inventoryService.getAllInventory().subscribe({
      next: (res) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = 'No data found.';
        } else {
          this.allInventories = dataList.map((i: any) => ({
            ...i,
            storeId: i.storeId || 'N/A',
            productId: i.productId || 'N/A',
          }));
          this.currentPage = 1;
          this.updatePaginatedInventories();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns filtered inventory records based on the provided search value.
  getInventoryByStore() {
    this.resetData();
    this.loading = true;
    this.inventoryService.getInventoryByStore(this.storeId).subscribe({
      next: (res) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = `No data found (Store ID: ${this.storeId})`;
        } else {
          this.allInventories = dataList.map((i: any) => ({
            ...i,
            storeId: i.storeId || 'N/A',
            productId: i.productId || 'N/A',
          }));
          this.currentPage = 1;
          this.updatePaginatedInventories();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err, this.storeId);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Returns filtered inventory records based on the provided search value.
  getInventoryByProduct() {
    this.resetData();
    this.loading = true;
    this.inventoryService.getInventoryByProduct(this.productId).subscribe({
      next: (res) => {
        const dataList = res.data || [];
        if (dataList.length === 0) {
          this.error = `No data found (Product ID: ${this.productId})`;
        } else {
          this.allInventories = dataList.map((i: any) => ({
            ...i,
            storeId: i.storeId || 'N/A',
            productId: i.productId || 'N/A',
          }));
          this.currentPage = 1;
          this.updatePaginatedInventories();
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = this.extractErrorMessage(err, this.productId);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Extracts a readable error message from the current API response.
  // 🔹 Extract backend error message properly
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';
    if (id !== undefined) {
      message += ` (ID: ${id})`;
    }
    return message;
  }

  // Handles reset data for the current component without changing the workflow.
  // 🔹 Reset UI
  resetData() {
    this.error = '';
    this.singleInventory = null;
    this.allInventories = [];
  }

  // Sends a request to update the selected inventory record with the provided data.
  // 🔹 Pagination Methods
  updatePaginatedInventories() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedInventories = this.allInventories.slice(start, end);
  }

  // Returns the required inventory data for the current request.
  getTotalPages(): number {
    return Math.ceil(this.allInventories.length / this.itemsPerPage);
  }

  // Moves to the selected page and refreshes the visible results as needed.
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedInventories();
    }
  }
}
