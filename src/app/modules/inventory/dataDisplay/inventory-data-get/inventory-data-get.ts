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

  onOptionSelected(option: string) {
    this.selectedOption = option;
    this.resetData();
  }

  isInputValid(): boolean {
    if (this.selectedOption === 'getAll') return true;
    if (this.selectedOption === 'getById') return !!this.inventoryId && this.inventoryId > 0;
    if (this.selectedOption === 'getByStore') return !!this.storeId && this.storeId > 0;
    if (this.selectedOption === 'getByProduct') return !!this.productId && this.productId > 0;
    return false;
  }

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

  // 🔹 Get Inventory by ID
  getInventoryById() {
    const id = this.form.value.inventoryId;

    this.resetData();
    this.loading = true;

    this.inventoryService.getInventory(id).subscribe({
      next: (res) => {
        if (!res.data) {
          this.error = 'No data found.';
        } else {
          this.singleInventory = res.data;
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

  getInventoryByStore() {
    this.resetData();
    this.loading = true;
    this.inventoryService.getInventoryByStore(this.storeId).subscribe({
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
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  getInventoryByProduct() {
    this.resetData();
    this.loading = true;
    this.inventoryService.getInventoryByProduct(this.productId).subscribe({
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
        this.error = this.extractErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // 🔹 Extract backend error message properly
  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';
  }

  // 🔹 Reset UI
  resetData() {
    this.error = '';
    this.singleInventory = null;
    this.allInventories = [];
  }

  // 🔹 Pagination Methods
  updatePaginatedInventories() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedInventories = this.allInventories.slice(start, end);
  }

  getTotalPages(): number {
    return Math.ceil(this.allInventories.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePaginatedInventories();
    }
  }
}
