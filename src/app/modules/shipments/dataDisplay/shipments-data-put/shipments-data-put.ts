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

  constructor(
    private shipmentsService: ShipmentsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    this.cdr.detectChanges();
    setTimeout(() => { this.showToast = false; this.cdr.detectChanges(); }, 3000);
  }

  ngOnInit(): void {
    this.shipmentsForm = new FormGroup({
      shipmentId: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      storeId: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required])
    });
  }

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
        this.showNotification('Shipment not found', 'error');
      }
    });
  }

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

  goBack(): void {
    this.router.navigate(['/modules/shipments']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
