import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { ApiDashboard } from './modules/api-dashboard/api-dashboard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { ModuleAccessGuard } from './shared/guards/module-access.guard';
import { Layout } from './shared/layout/layout';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

// Inventory Imports
import { InventoryApiDisplay } from './modules/inventory/inventory-api-display/inventory-api-display';
import { InventoryDataGet } from './modules/inventory/dataDisplay/inventory-data-get/inventory-data-get';
import { InventoryDataPost } from './modules/inventory/dataDisplay/inventory-data-post/inventory-data-post';
import { InventoryDataPut } from './modules/inventory/dataDisplay/inventory-data-put/inventory-data-put';
import { InventoryDataDelete } from './modules/inventory/dataDisplay/inventory-data-delete/inventory-data-delete';

// Products Imports
import { ProductsApiDisplay } from './modules/products/products-api-display/products-api-display';
import { ProductsDataGet } from './modules/products/dataDisplay/products-data-get/products-data-get';
import { ProductsDataPost } from './modules/products/dataDisplay/products-data-post/products-data-post';
import { ProductsDataPut } from './modules/products/dataDisplay/products-data-put/products-data-put';
import { ProductsDataDelete } from './modules/products/dataDisplay/products-data-delete/products-data-delete';

// Orders Imports
import { OrdersApiDispaly } from './modules/orders/orders-api-dispaly/orders-api-dispaly';
import { OrdersDataGet } from './modules/orders/dataDisplay/orders-data-get/orders-data-get';
import { OrdersDataPost } from './modules/orders/dataDisplay/orders-data-post/orders-data-post';
import { OrdersDataPut } from './modules/orders/dataDisplay/orders-data-put/orders-data-put';
import { OrdersDataDelete } from './modules/orders/dataDisplay/orders-data-delete/orders-data-delete';

// Order Items Imports
import { OrderItemsApiDisplay } from './modules/ordeItems/order-items-api-display/order-items-api-display';
import { OrderItemsDataGet } from './modules/ordeItems/dataDisplay/order-items-data-get/order-items-data-get';
import { OrderItemsDataPost } from './modules/ordeItems/dataDisplay/order-items-data-post/order-items-data-post';
import { OrderItemsDataPut } from './modules/ordeItems/dataDisplay/order-items-data-put/order-items-data-put';
import { OrderItemsDataDelete } from './modules/ordeItems/dataDisplay/order-items-data-delete/order-items-data-delete';

// Stores Imports
import { StoresApiDisplay } from './modules/Stores/stores-api-display/stores-api-display';
import { StoresDataGet } from './modules/Stores/dataDisplay/stores-data-get/stores-data-get';
import { StoresDataPost } from './modules/Stores/dataDisplay/stores-data-post/stores-data-post';
import { StoresDataPut } from './modules/Stores/dataDisplay/stores-data-put/stores-data-put';
import { StoresDataDelete } from './modules/Stores/dataDisplay/stores-data-delete/stores-data-delete';

// Customers Imports
import { CustomersApiDisplay } from './modules/customers/customers-api-display/customers-api-display';
import { CustomersDataGet } from './modules/customers/dataDisplay/customers-data-get/customers-data-get';
import { CustomersDataPost } from './modules/customers/dataDisplay/customers-data-post/customers-data-post';
import { CustomersDataPut } from './modules/customers/dataDisplay/customers-data-put/customers-data-put';
import { CustomersDataDelete } from './modules/customers/dataDisplay/customers-data-delete/customers-data-delete';

// Shipments Imports
import { ShipmentsApiDisplay } from './modules/shipments/shipments-api-display/shipments-api-display';
import { ShipmentsDataGet } from './modules/shipments/dataDisplay/shipments-data-get/shipments-data-get';
import { ShipmentsDataPost } from './modules/shipments/dataDisplay/shipments-data-post/shipments-data-post';
import { ShipmentsDataPut } from './modules/shipments/dataDisplay/shipments-data-put/shipments-data-put';
import { ShipmentsDataDelete } from './modules/shipments/dataDisplay/shipments-data-delete/shipments-data-delete';
import { ShipmentsDataPatch } from './modules/shipments/dataDisplay/shipments-data-patch/shipments-data-patch';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'access-denied', component: AccessDeniedComponent },

    // All protected routes wrapped in Layout (sidebar)
    {
        path: '',
        component: Layout,
        canActivate: [AuthGuard],
        children: [
            { path: 'api-dashboard', component: ApiDashboard },

            // Inventory
            {
                path: 'modules/inventory',
                component: InventoryApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: InventoryDataGet },
                    { path: 'get-by-id', component: InventoryDataGet },
                    { path: 'get-by-store', component: InventoryDataGet },
                    { path: 'get-by-product', component: InventoryDataGet },
                    { path: 'create', component: InventoryDataPost },
                    { path: 'update', component: InventoryDataPut },
                    { path: 'delete', component: InventoryDataDelete }
                ]
            },

            // Products
            {
                path: 'modules/products',
                component: ProductsApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: ProductsDataGet },
                    { path: 'get-by-id', component: ProductsDataGet },
                    { path: 'create', component: ProductsDataPost },
                    { path: 'update', component: ProductsDataPut },
                    { path: 'delete', component: ProductsDataDelete }
                ]
            },

            // Orders
            {
                path: 'modules/orders',
                component: OrdersApiDispaly,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: OrdersDataGet },
                    { path: 'get-by-id', component: OrdersDataGet },
                    { path: 'get-by-customer', component: OrdersDataGet },
                    { path: 'get-by-store', component: OrdersDataGet },
                    { path: 'get-by-status', component: OrdersDataGet },
                    { path: 'get-by-date-range', component: OrdersDataGet },
                    { path: 'create', component: OrdersDataPost },
                    { path: 'update', component: OrdersDataPut },
                    { path: 'update-status', component: OrdersDataPut },
                    { path: 'delete', component: OrdersDataDelete }
                ]
            },

            // Order Items
            {
                path: 'modules/order-items',
                component: OrderItemsApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-by-order', component: OrderItemsDataGet },
                    { path: 'get-by-product', component: OrderItemsDataGet },
                    { path: 'add-item', component: OrderItemsDataPost },
                    { path: 'update-item', component: OrderItemsDataPut },
                    { path: 'delete-item', component: OrderItemsDataDelete },
                    { path: 'total-quantity', component: OrderItemsDataGet }
                ]
            },

            // Stores
            {
                path: 'modules/stores',
                component: StoresApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: StoresDataGet },
                    { path: 'get-by-id', component: StoresDataGet },
                    { path: 'get-by-name', component: StoresDataGet },
                    { path: 'get-store-inventory', component: StoresDataGet },
                    { path: 'get-store-orders', component: StoresDataGet },
                    { path: 'get-store-shipments', component: StoresDataGet },
                    { path: 'create', component: StoresDataPost },
                    { path: 'update', component: StoresDataPut },
                    { path: 'delete', component: StoresDataDelete }
                ]
            },

            // Customers
            {
                path: 'modules/customers',
                component: CustomersApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: CustomersDataGet },
                    { path: 'get-by-customerid', component: CustomersDataGet },
                    { path: 'get-by-email', component: CustomersDataGet },
                    { path: 'get-orders', component: CustomersDataGet },
                    { path: 'get-shipments', component: CustomersDataGet },
                    { path: 'create', component: CustomersDataPost },
                    { path: 'update', component: CustomersDataPut },
                    { path: 'delete', component: CustomersDataDelete }
                ]
            },

            // Shipments
            {
                path: 'modules/shipments',
                component: ShipmentsApiDisplay,
                canActivate: [ModuleAccessGuard],
                children: [
                    { path: 'get-all', component: ShipmentsDataGet },
                    { path: 'get-by-id', component: ShipmentsDataGet },
                    { path: 'get-by-customerId', component: ShipmentsDataGet },
                    { path: 'get-by-storeId', component: ShipmentsDataGet },
                    { path: 'get-by-status', component: ShipmentsDataGet },
                    { path: 'create', component: ShipmentsDataPost },
                    { path: 'update', component: ShipmentsDataPut },
                    { path: 'delete', component: ShipmentsDataDelete },
                    { path: 'status', component: ShipmentsDataPatch }
                ]
            }
        ]
    },

    // Wildcard - must be last
    { path: '**', redirectTo: 'home' }
];
