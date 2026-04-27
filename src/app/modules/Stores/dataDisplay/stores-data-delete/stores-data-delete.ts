import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core'; 
import { StoresService } from '../../stores-service';

@Component({
  selector: 'app-stores-data-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './stores-data-delete.html',
  styleUrl: './stores-data-delete.css',
})
export class StoresDataDelete {

  deleteForm: FormGroup;
  message: string = '';
  error: string = '';
  deletedStore: any = null;

  constructor(
    private fb: FormBuilder, 
    private storesService: StoresService,
    private cdr: ChangeDetectorRef 
  , private router: Router) {
    this.deleteForm = this.fb.group({
      storeId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  deleteById() {
    this.message = '';
    this.error = '';
    this.deletedStore = null;

    if (this.deleteForm.invalid) {
      this.error = "Please enter a valid ID";
      return;
    }

    const id = this.deleteForm.value.storeId;

    this.storesService.getStoreById(id).subscribe({
      next: (res: any) => {
        const storeData = res.data || res;
        this.storesService.deleteStore(id).subscribe({
          next: () => {
            this.deletedStore = storeData;
            this.message = `ID ${id} is deleted successfully`;
            this.deleteForm.reset();
            this.cdr.detectChanges(); 
          },
          error: (err: HttpErrorResponse) => {
            console.error("Delete Error:", err);
            this.message = ''; 

            if (err.status === 404) {
              this.error = err.error?.msg || `ID ${id} not found`;
            } 
            else if (err.status === 400) {
               this.error = err.error?.msg || "Invalid Request";
            }
            else if (err.status === 0) {
              this.error = "Server is offline or unreachable";
            } 
            else if (err.status === 500) {
              this.error = err.error?.msg || "Cannot delete: store is referenced by existing orders";
            }
            else {
              this.error = err.error?.msg || "An unexpected error occurred";
            }
            this.cdr.detectChanges(); 
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error("Fetch Error:", err);
        if (err.status === 404) {
          this.error = err.error?.msg || `ID ${id} not found`;
        } else {
          this.error = 'Could not fetch store for deletion';
        }
        this.cdr.detectChanges();
      }
    });
  }

  goBack() { this.router.navigate(['/modules/stores']); }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
