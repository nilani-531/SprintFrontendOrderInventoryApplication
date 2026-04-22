import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stores-data-put',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-put.html',
  styleUrl: './stores-data-put.css',
})
export class StoresDataPut implements OnInit {

  storeForm!: FormGroup;

  error = '';
  success = '';
  isLoading = false;

  private storeId!: number;
  private baseUrl = 'http://localhost:9090/api/stores';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ❌ NO storeId in form (auto-generated, not user editable)
    this.storeForm = new FormGroup({
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
      this.storeId = +id;
      this.loadStore(this.storeId);
    }
  }

  // ✅ GET STORE
  loadStore(id: number): void {

    this.isLoading = true;
    this.error = '';
    this.success = '';

    this.http.get<any>(`${this.baseUrl}/${id}`).subscribe({
      next: (res) => {
        this.storeForm.patchValue(res.data);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        if (err.status === 404) {
          this.error = 'Store not found';
        } else if (err.status === 0) {
          this.error = 'Backend is not reachable';
        } else {
          this.error = 'Failed to load store';
        }
      }
    });
  }

  // ✅ UPDATE STORE (NO storeId SENT)
  handleUpdate(): void {

    this.error = '';
    this.success = '';

    if (this.storeForm.invalid) {
      this.error = 'Please fill all required fields';
      return;
    }

    const data = this.storeForm.value;

    this.http.put<any>(`${this.baseUrl}/${this.storeId}`, data)
      .subscribe({
        next: (res) => {
          this.success = res.msg || 'Store updated successfully';

          setTimeout(() => {
            this.router.navigate(['/stores']);
          }, 1000);
        },
        error: (err: HttpErrorResponse) => {

          if (err.status === 404) {
            this.error = 'Store not found';
          } else if (err.status === 400) {
            this.error = 'Invalid data';
          } else if (err.status === 0) {
            this.error = 'Server is offline or unreachable';
          } else {
            this.error = 'Update failed';
          }
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/stores']);
  }
}