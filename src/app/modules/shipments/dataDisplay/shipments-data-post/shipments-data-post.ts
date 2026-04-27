import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentsService } from '../../shipments-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-shipments-data-post',
  imports: [ReactiveFormsModule],
  templateUrl: './shipments-data-post.html',
  styleUrl: './shipments-data-post.css',
})
export class ShipmentsDataPost {
  shipmentsService: ShipmentsService = inject(ShipmentsService);
  router = inject(Router);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  shipmentsForm = new FormGroup({
    customerId: new FormControl('', [Validators.required]),
    storeId: new FormControl('', [Validators.required]),
    deliveryAddress: new FormControl('', [Validators.required]),
  });

  success: any = null;
  error: any = null;

  handleSubmit() {
    if (this.shipmentsForm.valid) {
      this.error = null;
      this.success = null;
      this.shipmentsService.createShipment(this.shipmentsForm.value).subscribe({
        next: (response: any) => {
          this.success = response.msg + ' (Shipment ID: ' + response.data.shipmentId + ')';
          this.shipmentsForm.reset();
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.error = err.error?.msg || (err.status === 0 ? 'Cannot connect to server' : 'Something went wrong');
          this.cdr.detectChanges();
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/modules/shipments']);
  }
}
