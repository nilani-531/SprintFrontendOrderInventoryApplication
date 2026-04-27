// This guard checks whether a user can access a route or module.
// It helps protect pages based on login, role, or feature rules.

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  // Initializes this component and prepares the dependencies used in the file.
  constructor(private auth: AuthService, private router: Router) {}

  // Checks whether the current user can access this route before navigation continues.
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.auth.isAdmin()) {
      return true;
    }

    this.router.navigate([this.auth.getDefaultModuleRoute()]);
    return false;
  }
}
