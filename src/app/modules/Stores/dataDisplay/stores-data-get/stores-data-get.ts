import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  imports: [NgIf, NgForOf, ReactiveFormsModule],
  templateUrl: './stores-data-get.html',
  styleUrls: ['./stores-data-get.css']
})
export class StoresDataGet {

  form: FormGroup;

  singleStore: Store | null = null;
  allStores: Store[] = [];

  loading = false;
  error = '';

  private baseUrl = 'http://localhost:9090/stores';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef   // 🔥 IMPORTANT FIX
  ) {
    this.form = this.fb.group({
      storeId: ['', [Validators.required, Validators.min(1)]] // 🔥 VALIDATION
    });
  }

  // 🔹 Get Store by ID
  getStoreById() {

    if (this.form.invalid) {
      this.error = 'Please enter a valid Store ID (greater than 0)';
      return;
    }

    const id = this.form.value.storeId;

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: (res) => {
          this.singleStore = res.data;
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
        }
      });
  }

  // 🔹 Get All Stores
  getAllStores() {

    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl)
      .subscribe({
        next: (res) => {
          this.allStores = res.data;
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 FIX
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges(); // 🔥 FIX
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
    this.singleStore = null;
    this.allStores = [];
  }
}