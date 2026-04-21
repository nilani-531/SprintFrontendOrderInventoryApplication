import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { ProductsAndInventoryApiDisplay } from './modules/productsAndInventory/products-and-inventory-api-display/products-and-inventory-api-display';

export const routes: Routes = [
    { path: '',component: Home  },
  { path: 'login', component: Login },
  { path: 'productAndInventoryApi',component: ProductsAndInventoryApiDisplay  },
  
];