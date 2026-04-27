import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentsService } from '../../shipments-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shipments-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './shipments-data-post.html',
  styleUrl: './shipments-data-post.css',
})
export class ShipmentsDataPost {
  shipmentsService: ShipmentsService = inject(ShipmentsService);
  router = inject(Router);

  shipmentsForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    storeId: new FormControl('', [Validators.required]),
    deliveryAddress: new FormControl('', [Validators.required]),
  });

  success: any = null;
  error: any = null;

  handleSubmit() {
    console.log(this.shipmentsForm.value);

    if (this.shipmentsForm.valid) {
      this.shipmentsService.createShipment(this.shipmentsForm.value).subscribe({
        next: (response: any) => {
          this.success = response.msg + ' (Shipment ID: ' + response.data.shipmentId + ')';
          this.shipmentsForm.reset();
        },

        error: (err) => {
          console.error(err);

          if (err.error && err.error.msg) {
            this.error = err.error.msg;
          } else if (err.status === 0) {
            this.error = 'Cannot connect to server';
          } else {
            this.error = 'Something went wrong';
          }
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/modules/shipments']);
  }

  private extractErrorMessage(err: any): string {
    return this.extractErrorMessage(err);
  }
}
