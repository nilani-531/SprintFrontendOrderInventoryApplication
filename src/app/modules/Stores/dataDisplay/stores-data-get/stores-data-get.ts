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

  private baseUrl = 'http://localhost:9090/api/stores';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      storeId: ['', [Validators.min(1)]],
      storeName: ['']
    });
  }

  // GET BY ID
  getStoreById() {

    const id = this.form.value.storeId;

    if (!id) {
      this.error = 'Please enter Store ID';
      return;
    }

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/${id}`)
      .subscribe({
        next: (res) => {
          this.singleStore = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => this.handleError(err)
      });
  }

  // NEW: GET BY NAME
  getStoreByName() {

    const name = this.form.value.storeName;

    if (!name) {
      this.error = 'Please enter Store Name';
      return;
    }

    this.resetData();
    this.loading = true;

    this.http.get<any>(`${this.baseUrl}/name/${name}`)
      .subscribe({
        next: (res) => {
          this.singleStore = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => this.handleError(err)
      });
  }

  // GET ALL
  getAllStores() {

    this.resetData();
    this.loading = true;

    this.http.get<any>(this.baseUrl)
      .subscribe({
        next: (res) => {
          this.allStores = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => this.handleError(err)
      });
  }

  // CENTRAL ERROR HANDLER (uses your backend exceptions)
  private handleError(err: any) {

    this.loading = false;

    if (err.status === 404) {
      this.error = err.error?.msg || 'Store not found';
    }
    else if (err.status === 400) {
      this.error = err.error?.msg || 'Invalid input';
    }
    else if (err.status === 409) {
      this.error = err.error?.msg || 'Duplicate resource';
    }
    else if (err.status === 0) {
      this.error = 'Backend is not reachable';
    }
    else {
      this.error = err.error?.msg || 'Something went wrong';
    }

    this.cdr.detectChanges();
  }

  resetData() {
    this.error = '';
    this.singleStore = null;
    this.allStores = [];
  }
}