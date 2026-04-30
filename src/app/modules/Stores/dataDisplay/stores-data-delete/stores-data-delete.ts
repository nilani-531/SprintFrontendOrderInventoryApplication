// This component deletes selected store records.
// It collects the required identifier and sends the remove request.

import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private readonly fb: FormBuilder,
    private readonly storesService: StoresService,
    private readonly cdr: ChangeDetectorRef
    , private readonly router: Router) {
    this.deleteForm = this.fb.group({
      storeId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Sends a request to delete the selected store record using its identifier.
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

            let msg = '';
            if (err.status === 404) {
              msg = err.error?.msg || `ID ${id} not found`;
            }
            else if (err.status === 400) {
              msg = err.error?.msg || "Invalid Request";
            }
            else if (err.status === 0) {
              msg = "Server is offline or unreachable";
            }
            else if (err.status === 500) {
              msg = err.error?.msg || "Cannot delete: store is referenced by existing orders";
            }
            else {
              msg = err.error?.msg || "An unexpected error occurred";
            }

            // Append ID context if not already present
            const idStr = String(id);
            if (id !== undefined && id !== null && !msg.includes(idStr)) {
              msg = `${msg} (ID: ${idStr})`;
            }

            this.error = msg;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error("Fetch Error:", err);
        let msg = '';
        if (err.status === 404) {
          msg = err.error?.msg || `ID ${id} not found`;
        } else {
          msg = `Could not fetch store #${id} for deletion`;
        }
        const idStr = String(id);
        if (id !== undefined && id !== null && !msg.includes(idStr)) {
          msg = `${msg} (ID: ${idStr})`;
        }
        this.error = msg;
        this.cdr.detectChanges();
      }
    });
  }

}
