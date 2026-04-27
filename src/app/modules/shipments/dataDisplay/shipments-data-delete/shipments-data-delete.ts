import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentsService } from '../../shipments-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shipments-data-delete',
  imports: [ReactiveFormsModule],
  templateUrl: './shipments-data-delete.html',
  styleUrl: './shipments-data-delete.css',
})
export class ShipmentsDataDelete {
  deleteForm: FormGroup;
  message: string = '';
  error: string = '';
  deletedShipment: any = null;

constructor(
  private fb: FormBuilder,
  private shipmentsService: ShipmentsService,
  private cdr: ChangeDetectorRef
, private router: Router) {
  this.deleteForm = this.fb.group({
    shipmentId: ['', [Validators.required, Validators.min(1)]]
  });
}

  deleteById() {
    this.message = '';
    this.error = '';
    this.deletedShipment = null;

    if (this.deleteForm.invalid) {
      this.error = "Please enter a valid ID";
      return;
    }

    const id = this.deleteForm.value.shipmentId;

    this.shipmentsService.getShipmentById(id).subscribe({
      next: (res: any) => {
        const shipmentData = res.data || res;
        this.shipmentsService.deleteShipment(id).subscribe({
          next: () => {
            this.deletedShipment = shipmentData;
            this.message = `Shipment ID ${id} is deleted successfully`;
            this.deleteForm.reset();
            this.cdr.detectChanges(); 
          },
          error: (err: HttpErrorResponse) => {
            console.error("Delete Error:", err);
            this.message = '';

            if (err.status === 404) {
              this.error = err.error?.msg || `Shipment ID ${id} not found`;
            } 
            else if (err.status === 400) {
              this.error = err.error?.msg || "Invalid Request";
            }
            else if (err.status === 0) {
              this.error = "Server is offline or unreachable";
            } 
            else {
              this.error = "An unexpected error occurred";
            }

            this.cdr.detectChanges(); 
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error("Fetch Error:", err);
        if (err.status === 404) {
          this.error = err.error?.msg || `Shipment ID ${id} not found`;
        } else {
          this.error = 'Could not fetch shipment for deletion';
        }
        this.cdr.detectChanges();
      }
    });
  }

  goBack() { this.router.navigate(['/modules/shipments']); }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
