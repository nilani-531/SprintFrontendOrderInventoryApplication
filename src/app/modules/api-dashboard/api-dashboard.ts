import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface ApiModule {
  name: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-api-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './api-dashboard.html',
  styleUrl: './api-dashboard.css',
})
export class ApiDashboard implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  accessibleApis: ApiModule[] = [];
  loggedInUser: string | null = null;

  ngOnInit(): void {
    this.loadUserApis();
  }

  /**
   * Load the APIs that are accessible to the currently logged-in user
   */
  private loadUserApis(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    const apiNames = this.authService.getAccessibleApis();

    this.accessibleApis = apiNames.map(apiName => {
      const displayInfo = this.authService.getApiDisplayInfo(apiName);
      return {
        name: apiName,
        title: displayInfo.title,
        description: displayInfo.description,
        icon: displayInfo.icon,
        route: this.authService.getApiRoute(apiName)
      };
    });
  }

  navigate(route: string): void {
    // Trim leading slash to avoid issues
    const path = route.startsWith('/') ? route.substring(1) : route;
    this.router.navigate([path]);
  }
}
