import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentsService } from '../../shipments-service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-shipments-data-put',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './shipments-data-put.html',
  styleUrl: './shipments-data-put.css',
})
export class ShipmentsDataPut {
  shipmentsForm!: FormGroup;

toastMessage: string = '';
toastType: 'success' | 'error' | 'info' = 'info';
showToast: boolean = false;

constructor(
  private shipmentsService: ShipmentsService,
  private route: ActivatedRoute,
  private router: Router
) {}

showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
  this.toastMessage = message;
  this.toastType = type;
  this.showToast = true;
  setTimeout(() => { this.showToast = false; }, 3000);
}

ngOnInit(): void {
  this.shipmentsForm = new FormGroup({
    shipmentId: new FormControl('', [Validators.required]),
    customerId: new FormControl('', [Validators.required]),
    storeId: new FormControl('', [Validators.required]),
    deliveryAddress: new FormControl('', [Validators.required])
  });

  const id = this.route.snapshot.params['id'];
  if (id) {
    this.shipmentsForm.get('shipmentId')?.setValue(id);
    this.loadShipment();
  }
}

loadShipment(): void {
  const id = this.shipmentsForm.get('shipmentId')?.value;
  if (!id) return;

  this.shipmentsService.getShipmentById(id).subscribe({
    next: (res: any) => {
      this.shipmentsForm.patchValue(res.data || res);
      this.shipmentsForm.get('shipmentId')?.setValue(id);
    },
    error: (err: any) => {
      console.error('Error loading shipment', err);
      this.showNotification('Failed to load shipment', 'error');
    }
  });
}

handleUpdate(): void {
  if (this.shipmentsForm.invalid) return;

  const shipmentId = this.shipmentsForm.get('shipmentId')?.value;

  const payload = {
    customerId: this.shipmentsForm.get('customerId')?.value,
    storeId: this.shipmentsForm.get('storeId')?.value,
    deliveryAddress: this.shipmentsForm.get('deliveryAddress')?.value
  };

  this.shipmentsService.updateShipment(shipmentId, payload).subscribe({
    next: () => {
      this.showNotification('Shipment updated successfully', 'success');
      setTimeout(() => this.router.navigate(['/shipments']), 1000);
    },
    error: (err: any) => {
      console.error('Update failed', err);
      this.showNotification('Update failed', 'error');
    }
  });
}

goBack(): void {
  this.router.navigate(['/shipments']);
}
}
