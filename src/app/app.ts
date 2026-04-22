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
import { ShipmentsDataDelete } from "./modules/shipments/dataDisplay/shipments-data-delete/shipments-data-delete";
import { ShipmentsDataGet } from "./modules/shipments/dataDisplay/shipments-data-get/shipments-data-get";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InventoryApiDisplay, ProductsApiDisplay, InventoryDataDelete, InventoryDataGet, InventoryDataPost, InventoryDataPut, ProductsDataDelete, ProductsDataPost, ProductsDataGet, ProductsDataPut, Login, ApiDashboard, Home, ShipmentsDataDelete, ShipmentsDataGet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrderInventoryApplicationFrontend');
}