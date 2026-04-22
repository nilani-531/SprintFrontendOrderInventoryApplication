import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { InventoryDataService } from '../inventory-data.service';

@Component({
  selector: 'app-inventory-data-put',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './inventory-data-put.html',
  styleUrl: './inventory-data-put.css',
})
export class InventoryDataPut implements OnInit {

  inventoryForm!: FormGroup;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' = 'info';
  showToast: boolean = false;

  constructor(
    private http: HttpClient,
    private inventoryService: InventoryDataService,
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
    this.inventoryForm = new FormGroup({
      inventoryId: new FormControl('', [Validators.required]),
      storeId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantityOnHand: new FormControl(0, [Validators.required]),
      reorderLevel: new FormControl(0),
      reorderQuantity: new FormControl(0)
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.inventoryForm.get('inventoryId')?.setValue(id);
      this.loadInventory();
    }
  }

  loadInventory(): void {
    const id = this.inventoryForm.get('inventoryId')?.value;
    if (!id) return;

    this.inventoryService.getInventory(id).subscribe({
      next: (res) => {
        this.inventoryForm.patchValue(res.data || res);
        this.inventoryForm.get('inventoryId')?.setValue(id);
      },
      error: (err) => {
        console.error('Error loading inventory', err);
        this.showNotification('Failed to load inventory', 'error');
      }
    });
  }

  handleUpdate(): void {
    if (this.inventoryForm.invalid) return;

    const inventoryId = this.inventoryForm.get('inventoryId')?.value;
    const storeId = this.inventoryForm.get('storeId')?.value;
    const productId = this.inventoryForm.get('productId')?.value;

    const payload = {
      productInventory: this.inventoryForm.get('quantityOnHand')?.value,
      reorderLevel: this.inventoryForm.get('reorderLevel')?.value,
      reorderQuantity: this.inventoryForm.get('reorderQuantity')?.value
    };

    this.inventoryService.updateInventory(inventoryId, storeId, productId, payload).subscribe({
      next: () => {
        this.showNotification('Inventory updated successfully', 'success');
        setTimeout(() => this.router.navigate(['/modules/inventory']), 1000);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.showNotification('Update failed', 'error');
      }
    });
  }

  goBack(): void { this.router.navigate(['/modules/inventory']); }
}
