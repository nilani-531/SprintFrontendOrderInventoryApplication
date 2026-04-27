// This component defines the common layout used across the application.
// It keeps shared navigation and routed content in one place.

import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  private authService = inject(AuthService);
  private router = inject(Router);

  loggedInUser = this.authService.getLoggedInUser();
  accessibleApis = this.authService.getAccessibleApis();
  isAdmin = this.authService.isAdmin();

  moduleLinks = this.accessibleApis.map(api => ({
    label: this.getLabel(api),
    route: '/modules/' + api
  }));

  // Returns the required application data for the current request.
  private getLabel(api: string): string {
    const labels: any = {
      customers: '👥 Customers',
      products: '📦 Products',
      inventory: '📋 Inventory',
      orders: '🛒 Orders',
      'order-items': '📝 Order Items',
      stores: '🏪 Stores',
      shipments: '🚚 Shipments'
    };

    return labels[api] || api;
  }

  // Handles logout for the current component without changing the workflow.
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}