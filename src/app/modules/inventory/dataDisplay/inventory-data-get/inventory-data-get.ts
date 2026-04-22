import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Inventory {
  inventoryId: number;
  stores: {
    storeId: number;
    storeName: string;
  };
  products: {
    productId: number;
    productName: string;
  };
  productInventory: number;
}

@Component({
  selector: 'app-inventory-data-get',
  standalone: true,
  imports: [NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './inventory-data-get.html',
  styleUrl: './inventory-data-get.css'
})
export class InventoryDataGet {

  form: FormGroup;

  singleInventory: Inventory | null = null;
  allInventories: Inventory[] = [];

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/api/inventory';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      inventoryId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // 🔹 Get Inventory by ID
  getInventoryById() {
    if (this.form.invalid) {
      this.error = 'Please enter a valid Inventory ID (greater than 0)';
      return;
    }

    const id = this.form.value.inventoryId;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: (res) => {
          this.singleInventory = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  // 🔹 Get All Inventories
  getAllInventories() {
    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl)
      .subscribe({
        next: (res) => {
          this.allInventories = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
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
}
