// This component partially updates existing shipment records.
// It sends only the fields that need to be changed.

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentsService } from '../../shipments-service';
import { Subscription } from 'rxjs';

type ShipmentStatus = 'CREATED' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED';

interface ShipmentDetails {
  shipmentId: number;
  customerId: number;
  storeId: number;
  shipmentStatus: string;
  deliveryAddress: string;
}

@Component({
  selector: 'app-shipments-data-patch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipments-data-patch.html',
  styleUrl: './shipments-data-patch.css',
})
export class ShipmentsDataPatch {
  private readonly requestTimeoutMs = 1500;
  private readonly shipmentsService = inject(ShipmentsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private activeRequest: Subscription | null = null;
  private requestTimer: ReturnType<typeof setTimeout> | null = null;

  readonly statusOptions: { value: ShipmentStatus; label: string }[] = [
    { value: 'CREATED', label: 'CREATED' },
    { value: 'SHIPPED', label: 'SHIPPED' },
    { value: 'IN_TRANSIT', label: 'IN TRANSIT' },
    { value: 'DELIVERED', label: 'DELIVERED' },
  ];

  readonly shipmentsForm = new FormGroup({
    shipmentId: new FormControl('', [Validators.required, Validators.min(1)]),
    shipmentStatus: new FormControl('', [Validators.required]),
  });

  shipmentDetails: ShipmentDetails | null = null;
  loading = false;
  success: string | null = null;
  error: string | null = null;

  // Loads the required shipment data before the next screen action runs.
  loadShipment(): void {
    this.cancelPendingRequest();
    this.clearMessages();
    this.shipmentDetails = null;
    this.shipmentsForm.controls.shipmentId.markAsTouched();

    const shipmentId = Number(this.shipmentsForm.controls.shipmentId.value);
    if (!shipmentId || Number.isNaN(shipmentId) || shipmentId < 1) {
      this.error = 'Please enter a valid shipment ID.';
      return;
    }

    this.loading = true;
    this.startRequestFallback();
    this.activeRequest = this.shipmentsService.getShipmentById(shipmentId).subscribe({
      next: (response: any) => {
        this.cancelPendingRequest();
        const shipment = (response?.data ?? response) as ShipmentDetails;
        this.shipmentDetails = shipment;
        this.shipmentsForm.patchValue({
          shipmentStatus: this.normalizeStatusValue(shipment.shipmentStatus),
        });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cancelPendingRequest();
        this.shipmentDetails = null;
        this.loading = false;
        this.error = 'Shipment not found';
        this.cdr.detectChanges();
      },
    });
  }

  // Handles patch status and updates the related state safely.
  handlePatchStatus(): void {
    this.cancelPendingRequest();
    this.clearMessages();
    this.shipmentsForm.controls.shipmentId.markAsTouched();
    this.shipmentsForm.controls.shipmentStatus.markAsTouched();

    if (!this.shipmentDetails) {
      this.error = 'Search and load a shipment before updating the status.';
      return;
    }

    if (this.shipmentsForm.invalid) {
      this.error = 'Please fill in all required fields correctly.';
      return;
    }

    const shipmentId = Number(this.shipmentsForm.controls.shipmentId.value);
    const shipmentStatus = this.shipmentsForm.controls.shipmentStatus.value as ShipmentStatus;

    if (shipmentStatus === this.normalizeStatusValue(this.shipmentDetails.shipmentStatus)) {
      this.error = 'Please choose a different status before updating.';
      return;
    }

    this.loading = true;
    this.startRequestFallback('Shipment status update failed.');
    this.activeRequest = this.shipmentsService.updateStatus(shipmentId, shipmentStatus).subscribe({
      next: () => {
        this.cancelPendingRequest();
        if (this.shipmentDetails) {
          this.shipmentDetails = {
            ...this.shipmentDetails,
            shipmentStatus,
          };
        }
        this.success = 'Updated successfully';
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.cancelPendingRequest();
        this.loading = false;
        this.error = this.extractErrorMessage(err, 'Shipment status update failed.');
        this.cdr.detectChanges();
      },
    });
  }

  // Returns to the previous screen or parent module page.
  goBack(): void {
    this.router.navigate(['/modules/shipments']);
  }

  // Clears the current success and error messages from the screen.
  private clearMessages(): void {
    this.success = null;
    this.error = null;
  }

  // Handles start request fallback for the current component without changing the workflow.
  private startRequestFallback(message: string = 'Shipment not found'): void {
    this.requestTimer = setTimeout(() => {
      this.activeRequest?.unsubscribe();
      this.activeRequest = null;
      this.loading = false;
      this.shipmentDetails = null;
      this.error = message;
      this.cdr.detectChanges();
    }, this.requestTimeoutMs);
  }

  // Returns whether cancel pending request is true for this flow.
  private cancelPendingRequest(): void {
    if (this.requestTimer) {
      clearTimeout(this.requestTimer);
      this.requestTimer = null;
    }

    if (this.activeRequest) {
      this.activeRequest.unsubscribe();
      this.activeRequest = null;
    }
  }

  // Returns the required shipment data for the current request.
  private getStatusLabel(status: ShipmentStatus): string {
    return this.statusOptions.find((option) => option.value === status)?.label ?? status;
  }

  // Handles normalize status value for the current component without changing the workflow.
  private normalizeStatusValue(value: string | null | undefined): ShipmentStatus | '' {
    if (!value) {
      return '';
    }

    return value.toString().trim().replace(/[\s-]+/g, '_').toUpperCase() as ShipmentStatus;
  }

  // Extracts a readable error message from the current API response.
  private extractErrorMessage(err: any, fallbackMessage: string): string {
    return err?.error?.msg || err?.message || fallbackMessage;
  }
}
