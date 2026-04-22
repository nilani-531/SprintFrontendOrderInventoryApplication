import { ChangeDetectorRef, Component } from '@angular/core';
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

constructor(
  private fb: FormBuilder,
  private shipmentsService: ShipmentsService,
  private cdr: ChangeDetectorRef
) {
  this.deleteForm = this.fb.group({
    shipmentId: ['', [Validators.required, Validators.min(1)]]
  });
}

deleteById() {
  this.message = '';
  this.error = '';

  if (this.deleteForm.invalid) {
    this.error = "Please enter a valid ID";
    return;
  }

  const id = this.deleteForm.value.shipmentId;

  this.shipmentsService.deleteShipment(id).subscribe({
    next: (res: any) => {
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
}
}
