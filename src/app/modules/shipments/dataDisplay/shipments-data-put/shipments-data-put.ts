// This component updates existing shipment records.
// It is used when the user wants to replace saved data with new values.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentsService } from '../../shipments-service';
import { Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipments-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './shipments-data-put.html',
  styleUrl: './shipments-data-put.css',
})
export class ShipmentsDataPut implements OnInit {
  shipmentsForm!: FormGroup;

  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;
  loading: boolean = false;
  shipmentDetails: any = null;

  // Initializes this component and prepares the dependencies used in the file.
  constructor(
    private shipmentsService: ShipmentsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  // Displays a toast message for the latest success or error response.
  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => { this.showToast = false; this.cdr.detectChanges(); }, 3000);
  }

  // Runs when the component loads and prepares the initial data and screen state.
  ngOnInit(): void {
    this.shipmentsForm = new FormGroup({
      shipmentId: new FormControl('', [Validators.required, Validators.min(1)]),
      customerId: new FormControl('', [Validators.required, Validators.min(1)]),
      storeId: new FormControl('', [Validators.required, Validators.min(1)]),
      deliveryAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(512)
      ])
    });
  }

  // Loads the required shipment data before the next screen action runs.
  loadShipment(): void {
    const id = this.shipmentsForm.get('shipmentId')?.value;
    if (!id) {
      this.showNotification('Enter a valid Shipment ID', 'error');
      return;
    }
    this.loading = true;
    this.shipmentsService.getShipmentById(id).subscribe({
      next: (res: any) => {
        this.shipmentDetails = res.data || res;
        this.shipmentsForm.patchValue({
          customerId: this.shipmentDetails.customerId,
          storeId: this.shipmentDetails.storeId,
          deliveryAddress: this.shipmentDetails.deliveryAddress
        });
        this.loading = false;
        this.cdr.detectChanges();
        this.showNotification('Shipment loaded successfully', 'info');
      },
      error: (err: any) => {
        this.loading = false;
        this.shipmentDetails = null;
        this.cdr.detectChanges();
        const id = this.shipmentsForm.get('shipmentId')?.value;
        this.showNotification(`Shipment not found (ID: ${id})`, 'error');
      }
    });
  }

  // Handles update and updates the related state safely.
  handleUpdate(): void {
    if (this.shipmentsForm.invalid || !this.shipmentDetails) return;

    const shipmentId = this.shipmentsForm.get('shipmentId')?.value;
    const payload = {
      customerId: Number(this.shipmentsForm.get('customerId')?.value),
      storeId: Number(this.shipmentsForm.get('storeId')?.value),
      deliveryAddress: this.shipmentsForm.get('deliveryAddress')?.value
    };

    this.shipmentsService.updateShipment(shipmentId, payload).subscribe({
      next: () => {
        this.showNotification(`Shipment updated successfully (ID: ${shipmentId})`, 'success');
      },
      error: (err: any) => {
        const msg = err.error?.msg || err.error?.message || 'Update failed';
        this.showNotification(msg, 'error');
      }
    });
  }

  // Returns to the previous screen or parent module page.
  goBack(): void {
    this.router.navigate(['/modules/shipments']);
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, id?: any): string {
    let message = err?.error?.msg || err?.error?.data || err?.message || 'An error occurred while processing the request.';
    if (id !== undefined) message += ` (ID: ${id})`;
    return message;
  }
}
