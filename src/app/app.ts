import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryApiDisplay } from "./modules/inventory/inventory-api-display/inventory-api-display";
import { ProductsApiDisplay } from "./modules/products/products-api-display/products-api-display";
import { InventoryDataDelete } from "./modules/inventory/dataDisplay/inventory-data-delete/inventory-data-delete";
import { InventoryDataGet } from "./modules/inventory/dataDisplay/inventory-data-get/inventory-data-get";
import { InventoryDataPost } from "./modules/inventory/dataDisplay/inventory-data-post/inventory-data-post";
import { InventoryDataPut } from "./modules/inventory/dataDisplay/inventory-data-put/inventory-data-put";
import { ProductsDataDelete } from "./modules/products/dataDisplay/products-data-delete/products-data-delete";
import { ProductsDataPost } from "./modules/products/dataDisplay/products-data-post/products-data-post";
import { ProductsDataGet } from "./modules/products/dataDisplay/products-data-get/products-data-get";
import { ProductsDataPut } from "./modules/products/dataDisplay/products-data-put/products-data-put";
import { Login } from "./login/login";
import { ApiDashboard } from "./modules/api-dashboard/api-dashboard";
import { Home } from "./home/home";
import { CustomersDataGet } from "./modules/customers/dataDisplay/customers-data-get/customers-data-get";
import { CustomerGetNavbar } from "./modules/customers/dataDisplay/customer-get-navbar/customer-get-navbar";
import { CustomersApiDisplay } from "./modules/customers/customers-api-display/customers-api-display";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InventoryApiDisplay, ProductsApiDisplay, InventoryDataDelete, InventoryDataGet, InventoryDataPost, InventoryDataPut, ProductsDataDelete, ProductsDataPost, ProductsDataGet, ProductsDataPut, Login, ApiDashboard, Home, CustomersDataGet, CustomerGetNavbar, CustomersApiDisplay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}