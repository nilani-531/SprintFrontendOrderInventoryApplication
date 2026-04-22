import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShipmentsService } from '../../shipments-service';
import { NgIf, NgForOf } from "@angular/common";

interface Shipment {
  shipmentId: number;
  customerId: number;
  storeId: number;
  deliveryAddress: string;
  shipmentStatus?: string;
}

@Component({
  selector: 'app-shipments-data-get',
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './shipments-data-get.html',
  styleUrl: './shipments-data-get.css',
})

export class ShipmentsDataGet {
  form: FormGroup;

  singleShipment: Shipment | null = null;
  allShipments: Shipment[] = [];

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private shipmentsService: ShipmentsService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      shipmentId: ['',{
      validators: [Validators.min(1)],
      updateOn: 'change'
    }],
      customerId: [''],
      storeId: [''],
      status: ['']
    });
  }

  getShipmentById() {

    const id = this.form.value.shipmentId;

    if (!id) {
      this.error = 'Please enter Shipment ID';
      return;
    }

    this.resetData();
    this.loading = true;

    this.shipmentsService.getShipmentById(id)
      .subscribe({
        next: (res) => {
          this.singleShipment = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  getAllShipments() {

    this.resetData();
    this.loading = true;

    this.shipmentsService.getAllShipments()
      .subscribe({
        next: (res) => {
          this.allShipments = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  getByCustomerId() {

    const id = this.form.value.customerId;

    if (!id) {
      this.error = 'Please enter Customer ID';
      return;
    }

    this.resetData();
    this.loading = true;

    this.shipmentsService.getByCustomerId(id)
      .subscribe({
        next: (res) => {
          this.allShipments = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  getByStoreId() {

    const id = this.form.value.storeId;

    if (!id) {
      this.error = 'Please enter Store ID';
      return;
    }

    this.resetData();
    this.loading = true;

    this.shipmentsService.getByStoreId(id)
      .subscribe({
        next: (res) => {
          this.allShipments = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  getByStatus() {

    const status = this.form.value.status;

    if (!status) {
      this.error = 'Please enter Shipment Status';
      return;
    }

    this.resetData();
    this.loading = true;

    this.shipmentsService.getByStatus(status)
      .subscribe({
        next: (res) => {
          this.allShipments = res.data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.error = this.extractErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private extractErrorMessage(err: any): string {
    return err?.error?.msg || err?.error?.data || err?.message || 'Something went wrong';
  }

  resetData() {
    this.error = '';
    this.singleShipment = null;
    this.allShipments = [];
  }
}