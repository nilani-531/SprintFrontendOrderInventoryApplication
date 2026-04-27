// This guard checks whether a user can access a route or module.
// It helps protect pages based on login, role, or feature rules.

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ModuleAccessGuard implements CanActivate {
  // Initializes this component and prepares the dependencies used in the file.
  constructor(private auth: AuthService, private router: Router) {}

  // Checks whether the current user can access this route before navigation continues.
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.auth.isAdmin()) {
      return true;
    }

    const path = route.routeConfig?.path || '';
    const segment = path.replace('modules/', '').trim();

    const allowed = new Set(this.auth.getAccessibleApis());
    if (allowed.has(segment)) {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;
  }
}
