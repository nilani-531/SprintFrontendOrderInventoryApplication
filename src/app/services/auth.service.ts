import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TEAM_MEMBERS } from '../shared/models/team-data';
import { TeamMember } from '../shared/models/team.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BACKEND_URL = 'http://localhost:9090';
  private readonly SELECTED_MEMBER_KEY = 'selectedMember';

  /**
   * Maps each username to their accessible API modules
   */
  private readonly userApiMap: { [key: string]: string[] } = {
    'karthi': ['products', 'inventory'],
    'nilani': ['orders', 'order-items'],
    'pooja': ['stores'],
    'abinaya': ['customers'],
    'yamini': ['shipments'],
    'admin': ['products', 'inventory', 'orders', 'order-items', 'stores', 'customers', 'shipments']
  };

  /**
   * Maps each username to backend endpoints for credential validation
   */
  private readonly userEndpointMap: { [key: string]: string[] } = {
    'karthi': [`${this.BACKEND_URL}/api/products`, `${this.BACKEND_URL}/api/inventory`],
    'nilani': [`${this.BACKEND_URL}/api/orders`],
    'pooja': [`${this.BACKEND_URL}/api/stores`],
    'abinaya': [`${this.BACKEND_URL}/api/customers`],
    'yamini': [`${this.BACKEND_URL}/api/shipments`],
    'admin': [`${this.BACKEND_URL}/api/products`, `${this.BACKEND_URL}/api/inventory`, `${this.BACKEND_URL}/api/orders`, `${this.BACKEND_URL}/api/stores`, `${this.BACKEND_URL}/api/customers`, `${this.BACKEND_URL}/api/shipments`]
  };

  /**
   * Maps API names to their display information
   */
  private readonly apiDisplayMap: { [key: string]: { title: string; description: string; icon: string } } = {
    'products': {
      title: '📦 Products API',
      description: 'Manage product endpoints',
      icon: '📦'
    },
    'inventory': {
      title: '📋 Inventory API',
      description: 'Manage inventory endpoints',
      icon: '📋'
    },
    'orders': {
      title: '🛒 Orders API',
      description: 'Manage order endpoints',
      icon: '🛒'
    },
    'order-items': {
      title: '📦 Order Items API',
      description: 'Manage order items endpoints',
      icon: '📦'
    },
    'stores': {
      title: '🏪 Stores API',
      description: 'Manage store endpoints',
      icon: '🏪'
    },
    'customers': {
      title: '👥 Customers API',
      description: 'Manage customer endpoints',
      icon: '👥'
    },
    'shipments': {
      title: '🚚 Shipments API',
      description: 'Manage shipment endpoints',
      icon: '🚚'
    }
  };

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Get all team members (for home page display)
   */
  getAllMembers(): TeamMember[] {
    return TEAM_MEMBERS;
  }

  /**
   * Persist selected member so module screens can render endpoint metadata.
   */
  setSelectedMember(member: TeamMember): void {
    sessionStorage.setItem(this.SELECTED_MEMBER_KEY, JSON.stringify(member));
  }

  /**
   * Resolve selected member from session or fallback to logged-in user mapping.
   */
  getSelectedMember(): TeamMember | null {
    const raw = sessionStorage.getItem(this.SELECTED_MEMBER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as TeamMember;
      } catch {
        sessionStorage.removeItem(this.SELECTED_MEMBER_KEY);
      }
    }

    const username = this.getLoggedInUser();
    if (!username) return null;
    const normalized = username.toLowerCase();
    return TEAM_MEMBERS.find(m => m.username.toLowerCase() === normalized) || null;
  }

  getDefaultModuleRoute(): string {
    const allowedApis = this.getAccessibleApis();
    if (allowedApis.length > 0) {
      return this.getApiRoute(allowedApis[0]);
    }
    return '/api-dashboard';
  }

  /**
   * Get the currently logged-in username
   */
  getLoggedInUser(): string | null {
    return sessionStorage.getItem('loggedInUser');
  }

  /**
   * Get the stored Basic Auth credentials
   */
  getAuthCredentials(): string | null {
    return sessionStorage.getItem('authCredentials');
  }

  /**
   * Login by sending HTTP request with Basic Auth to the backend
   */
  login(username: string, password: string): Observable<any> {
    const encoded = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({ 'Authorization': `Basic ${encoded}` });

    // Choose the probe URL (first accessible endpoint)
    const userEndpoints = this.userEndpointMap[username.toLowerCase()];
    const probeUrl = (userEndpoints && userEndpoints.length > 0)
      ? userEndpoints[0]
      : `${this.BACKEND_URL}/api/products`;

    return this.http.get<any>(probeUrl, { headers });
  }

  /**
   * Store credentials after successful login
   */
  storeCredentials(username: string, encodedCredentials: string): void {
    const normalized = username.toLowerCase();
    sessionStorage.setItem('authCredentials', encodedCredentials);
    sessionStorage.setItem('loggedInUser', normalized);

    const endpoints = this.userEndpointMap[normalized] || [];
    sessionStorage.setItem('allowedEndpoints', JSON.stringify(endpoints));

    const selected = TEAM_MEMBERS.find(m => m.username.toLowerCase() === normalized);
    if (selected) {
      this.setSelectedMember(selected);
    } else {
      sessionStorage.removeItem(this.SELECTED_MEMBER_KEY);
    }
  }

  /**
   * Get the API modules accessible to the current user
   */
  getAccessibleApis(): string[] {
    const username = this.getLoggedInUser();
    if (!username) {
      return [];
    }
    return this.userApiMap[username] || [];
  }

  /**
   * Get the display information for an API module
   */
  getApiDisplayInfo(apiName: string): { title: string; description: string; icon: string } {
    return this.apiDisplayMap[apiName] || {
      title: apiName,
      description: `Manage ${apiName} endpoints`,
      icon: '📌'
    };
  }

  /**
   * Get the route path for an API module
   */
  getApiRoute(apiName: string): string {
    return `/modules/${apiName}`;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getLoggedInUser() !== null && this.getAuthCredentials() !== null;
  }

  isAdmin(): boolean {
    return this.getLoggedInUser() === 'admin';
  }

  /**
   * Clear authentication data on logout
   */
  logout(): void {
    sessionStorage.removeItem('authCredentials');
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('allowedEndpoints');
    sessionStorage.removeItem(this.SELECTED_MEMBER_KEY);
  }
}
