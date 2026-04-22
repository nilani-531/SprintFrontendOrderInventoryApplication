import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

interface Store {
  storeId: number;
  storeName: string;
  physicalAddress: string;
  webAddress: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-stores-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './stores-data-put.html',
  styleUrls: ['./stores-data-put.css'],
})
export class StoresDataPut implements OnInit {

  storeForm!: FormGroup;

  error = '';
  success = '';
  isLoading = false;

  private baseUrl = 'http://localhost:9090/api/stores';

  // IMPORTANT: store resolved id here
  private storeId: number | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.storeForm = new FormGroup({
      storeId: new FormControl({ value: '', disabled: true }),
      storeName: new FormControl('', [Validators.required]),
      webAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)/)
      ]),
      physicalAddress: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.fetchStoreById(+id);
    }
  }

  // ---------------------------
  // GET STORE BY ID
  // ---------------------------
  fetchStoreById(id: number) {

    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.http.get<any>(`${this.baseUrl}/${id}`).subscribe({
      next: (res) => {

        const store: Store = res.data;

        this.storeId = store.storeId;

        this.storeForm.patchValue(store);
        this.storeForm.get('storeId')?.setValue(store.storeId);

        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (err: HttpErrorResponse) => {
        this.handleError(err);
      }
    });
  }

  // ---------------------------
  // GET STORE BY NAME (IMPORTANT FOR YOUR CASE)
  // ---------------------------
  fetchByName(name: string) {

    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.http.get<any>(`${this.baseUrl}/name/${name}`).subscribe({
      next: (res) => {

        const store: Store = res.data;

        this.storeId = store.storeId;

        this.storeForm.patchValue(store);
        this.storeForm.get('storeId')?.setValue(store.storeId);

        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (err) => this.handleError(err)
    });
  }

  // ---------------------------
  // UPDATE STORE (FIXED)
  // ---------------------------
  handleUpdate(): void {

    this.error = '';
    this.success = '';

    if (this.storeForm.invalid) {
      this.error = 'Please fill in all required fields';
      return;
    }

    // CRITICAL FIX: use stored ID, NOT form
    if (!this.storeId) {
      this.error = 'Store ID not loaded. Fetch store first.';
      return;
    }

    const payload = this.storeForm.getRawValue();

    this.http.put<any>(`${this.baseUrl}/${this.storeId}`, payload)
      .subscribe({
        next: (res) => {

          this.success = res.msg || 'Store updated successfully';

          this.cdr.detectChanges();

          setTimeout(() => {
            this.success = '';
            this.cdr.detectChanges();
          }, 2000);
        },

        error: (err: HttpErrorResponse) => {
          this.handleError(err);
        }
      });
  }

  // ---------------------------
  // CENTRAL ERROR HANDLER
  // ---------------------------
  private handleError(err: HttpErrorResponse) {

    this.isLoading = false;

    if (err.status === 404) {
      this.error = err.error?.msg || 'Store not found';
    }
    else if (err.status === 400) {
      this.error = err.error?.msg || 'Invalid data';
    }
    else if (err.status === 409) {
      this.error = err.error?.msg || 'Duplicate entry';
    }
    else if (err.status === 0) {
      this.error = 'Server is offline or unreachable';
    }
    else {
      this.error = err.error?.msg || 'Something went wrong';
    }

    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['/stores']);
  }
}