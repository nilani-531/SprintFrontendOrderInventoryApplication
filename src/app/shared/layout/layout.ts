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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}