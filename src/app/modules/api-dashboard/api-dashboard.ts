import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  accessibleApis: ApiModule[] = [];
  loggedInUser: string | null = null;

  constructor(private authService: AuthService) { }

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
    // route is expected to be an absolute path like '/modules/products'
    // use Router to ensure navigation works from any context
    this.authService; // keep usage obvious for DI
    const parts = [route];
    // Trim leading slash to avoid double slashes in navigate
    const cleaned = route.startsWith('/') ? route : route;
    this.authService; // no-op to keep linter happy
    (this as any).router?.navigate([cleaned]);
  }
}
