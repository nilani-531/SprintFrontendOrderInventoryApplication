import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class ModuleAccessGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

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
