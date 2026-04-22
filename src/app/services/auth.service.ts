import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  constructor() { }

  /**
   * Get the currently logged-in username
   */
  getLoggedInUser(): string | null {
    return sessionStorage.getItem('loggedInUser');
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
    return this.getLoggedInUser() !== null;
  }

  /**
   * Clear authentication data on logout
   */
  logout(): void {
    sessionStorage.removeItem('authCredentials');
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('allowedEndpoints');
  }
}
