import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { InventoryApiDisplay } from './modules/inventory/inventory-api-display/inventory-api-display';
import { ProductsApiDisplay } from './modules/products/products-api-display/products-api-display';
import { InventoryDataPost } from './modules/inventory/dataDisplay/inventory-data-post/inventory-data-post';
import { InventoryDataDelete } from './modules/inventory/dataDisplay/inventory-data-delete/inventory-data-delete';
import { ProductsDataPost } from './modules/products/dataDisplay/products-data-post/products-data-post';
import { ProductsDataDelete } from './modules/products/dataDisplay/products-data-delete/products-data-delete';
import { InventoryDataGet } from './modules/inventory/dataDisplay/inventory-data-get/inventory-data-get';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { 
        path: 'inventory',
        component: InventoryApiDisplay,
        children: [
            { path: 'get-all', component: InventoryDataGet },
            { path: 'get-by-id', component: InventoryDataGet },
            { path: 'create', component: InventoryDataPost },
            { path: 'update', component: InventoryApiDisplay },
            { path: 'delete', component: InventoryDataDelete }
        ]
    },
    { 
        path: 'products',
        component: ProductsApiDisplay,
        children: [
            { path: 'get-all', component: ProductsApiDisplay },
            { path: 'get-by-id', component: ProductsApiDisplay },
            { path: 'create', component: ProductsDataPost },
            { path: 'update', component: ProductsApiDisplay },
            { path: 'delete', component: ProductsDataDelete }
        ]
    }
];
