import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Store {
  storeId: number;
  storeName: string;
  webAddress: string;
  physicalAddress: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoresService {
  http: HttpClient = inject(HttpClient);

  getAllStores() {
    return this.http.get('http://localhost:9090/api/stores');
  }

  getStoreById(storeId: number) {
    return this.http.get(`http://localhost:9090/api/stores/${storeId}`);
  }

  getStoreInventory(storeId: number) {
    return this.http.get(`http://localhost:9090/api/stores/${storeId}/inventory`);
  }

  getStoreOrders(storeId: number) {
    return this.http.get(`http://localhost:9090/api/stores/${storeId}/orders`);
  }

  createStore(store: any) {
    return this.http.post('http://localhost:9090/api/stores', store);
  }

  updateStore(storeId: number, store: any) {
    return this.http.put(`http://localhost:9090/api/stores/${storeId}`, store);
  }

  deleteStore(storeId: number) {
    return this.http.delete(`http://localhost:9090/api/stores/${storeId}`);
  }
}
