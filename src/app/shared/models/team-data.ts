import { TeamMember } from './team.model';

const BASE = 'http://localhost:9090';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'abinaya',
    name: 'Abinaya',
    username: 'abinaya',
    password: 'abi123',
    role: 'Backend Developer',
    avatar: 'AB',
    color: '#6366F1',
    bgClass: 'member-indigo',
    modules: ['Customers API'],
    endpoints: [
      {
        id: 'cust-get-all', method: 'GET', url: `${BASE}/api/customers`,
        summary: 'Get All Customers', category: 'Customers',
        description: 'Retrieves a complete list of all registered customers in the system.',
      },
      {
        id: 'cust-get-by-id', method: 'GET', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Get Customer by ID', category: 'Customers',
        description: 'Fetches a specific customer record using their unique customer ID.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-get-by-email', method: 'GET', url: `${BASE}/api/customers/search`,
        summary: 'Get Customer by Email', category: 'Customers',
        description: 'Looks up a customer record using their registered email address.',
        queryParams: [{ name: 'email', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. user@example.com' }]
      },
      {
        id: 'cust-get-orders', method: 'GET', url: `${BASE}/api/customers/{customerId}/orders`,
        summary: 'Get Orders of Customer', category: 'Customers',
        description: 'Retrieves all orders placed by a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-get-shipments', method: 'GET', url: `${BASE}/api/customers/{customerId}/shipments`,
        summary: 'Get Shipments of Customer', category: 'Customers',
        description: 'Retrieves all shipments associated with a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-create', method: 'POST', url: `${BASE}/api/customers`,
        summary: 'Create New Customer', category: 'Customers',
        description: 'Creates a new customer record with full name and email address.',
        bodyFields: [
          { name: 'fullName', type: 'string', label: 'Full Name', required: true, placeholder: 'e.g. John Doe' },
          { name: 'emailAddress', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. john@example.com' }
        ]
      },
      {
        id: 'cust-update', method: 'PUT', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Update Customer', category: 'Customers',
        description: 'Updates the name and/or email of an existing customer record.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'fullName', type: 'string', label: 'Full Name', required: true, placeholder: 'e.g. Jane Doe' },
          { name: 'emailAddress', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. jane@example.com' }
        ]
      },
      {
        id: 'cust-delete', method: 'DELETE', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Delete Customer', category: 'Customers',
        description: 'Permanently removes a customer record from the system by their ID.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      }
    ]
  },

  {
    id: 'nilani',
    name: 'Nilani',
    username: 'nilani',
    password: '54321N',
    role: 'Backend Developer',
    avatar: 'NI',
    color: '#10B981',
    bgClass: 'member-emerald',
    modules: ['Orders API', 'Order Items API'],
    endpoints: [
      {
        id: 'ord-get-all', method: 'GET', url: `${BASE}/api/orders`,
        summary: 'Get All Orders', category: 'Orders',
        description: 'Retrieves a complete list of all orders placed in the system.',
      },
      {
        id: 'ord-get-by-id', method: 'GET', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Get Order by ID', category: 'Orders',
        description: 'Fetches a specific order by its unique identifier.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-count', method: 'GET', url: `${BASE}/api/orders/count`,
        summary: 'Get Orders Count by Status', category: 'Orders',
        description: 'Returns the total count of orders filtered by their processing status.',
        queryParams: [{ name: 'status', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-create', method: 'POST', url: `${BASE}/api/orders`,
        summary: 'Create New Order', category: 'Orders',
        description: 'Creates a new order for a customer from a specific store with a given status.',
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'orderStatusS', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] },
          { name: 'orderTms', type: 'datetime', label: 'Order Timestamp', required: false, placeholder: '2024-01-15T10:30:00' }
        ]
      },
      {
        id: 'ord-update', method: 'PUT', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Update Order Store or Customer', category: 'Orders',
        description: 'Updates order links by passing either storeId or customerId query parameter.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: false, placeholder: 'e.g. 2' },
          { name: 'customerId', type: 'number', label: 'Customer ID', required: false, placeholder: 'e.g. 3' }
        ]
      },
      {
        id: 'ord-by-customer', method: 'GET', url: `${BASE}/api/orders/customer/{customerId}`,
        summary: 'Get Orders by Customer', category: 'Orders',
        description: 'Returns all orders for a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-by-store', method: 'GET', url: `${BASE}/api/orders/store/{storeId}`,
        summary: 'Get Orders by Store', category: 'Orders',
        description: 'Returns all orders for a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-by-status', method: 'GET', url: `${BASE}/api/orders/status/{status}`,
        summary: 'Get Orders by Status', category: 'Orders',
        description: 'Returns all orders with a specific status.',
        pathParams: [{ name: 'status', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-by-date-range', method: 'GET', url: `${BASE}/api/orders/date-range`,
        summary: 'Get Orders by Date Range', category: 'Orders',
        description: 'Returns orders between two timestamps.',
        queryParams: [
          { name: 'from', type: 'datetime', label: 'From', required: true, placeholder: '2026-04-01T00:00:00' },
          { name: 'to', type: 'datetime', label: 'To', required: true, placeholder: '2026-04-30T23:59:59' }
        ]
      },
      {
        id: 'ord-update-status', method: 'PATCH', url: `${BASE}/api/orders/{orderId}/status`,
        summary: 'Update Order Status', category: 'Orders',
        description: 'Updates the processing status of an existing order to a new value.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [{ name: 'status', type: 'select', label: 'New Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-delete', method: 'DELETE', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Delete Order', category: 'Orders',
        description: 'Permanently removes an order record from the system.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'oi-get-by-order', method: 'GET', url: `${BASE}/api/orders/{orderId}/items`,
        summary: 'Get Items by Order', category: 'Order Items',
        description: 'Fetches all line items (products) that belong to a specific order.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'oi-add', method: 'POST', url: `${BASE}/api/orders/{orderId}/items`,
        summary: 'Add Item to Order', category: 'Order Items',
        description: 'Adds a new line item to an existing order for a specific product.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }
        ],
        queryParams: [
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 2' }
        ],
        bodyFields: [
          { name: 'quantity', type: 'number', label: 'Quantity', required: true, placeholder: 'e.g. 3' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 29.99' }
        ]
      },
      {
        id: 'oi-update', method: 'PUT', url: `${BASE}/api/orders/{orderId}/items/{lineItemId}`,
        summary: 'Update Order Item', category: 'Order Items',
        description: 'Updates the quantity and/or unit price of an existing order line item.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' },
          { name: 'lineItemId', type: 'number', label: 'Line Item ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'quantity', type: 'number', label: 'Quantity', required: true, placeholder: 'e.g. 5' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 24.99' }
        ]
      },
      {
        id: 'oi-delete', method: 'DELETE', url: `${BASE}/api/orders/{orderId}/items/{lineItemId}`,
        summary: 'Delete Order Item', category: 'Order Items',
        description: 'Removes a specific line item from an order permanently.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' },
          { name: 'lineItemId', type: 'number', label: 'Line Item ID', required: true, placeholder: 'e.g. 1' }
        ]
      }
    ]
  },

  {
    id: 'yamini',
    name: 'Yamini',
    username: 'yamini',
    password: 'yamx123',
    role: 'Backend Developer',
    avatar: 'YA',
    color: '#F59E0B',
    bgClass: 'member-amber',
    modules: ['Shipments API'],
    endpoints: [
      {
        id: 'ship-get-all', method: 'GET', url: `${BASE}/api/shipments`,
        summary: 'Get All Shipments', category: 'Shipments',
        description: 'Retrieves a list of all shipments recorded in the system.',
      },
      {
        id: 'ship-get-by-id', method: 'GET', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Get Shipment by ID', category: 'Shipments',
        description: 'Fetches the full details of a specific shipment by its ID.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-customer', method: 'GET', url: `${BASE}/api/shipments/customer/{customerId}`,
        summary: 'Get Shipments by Customer', category: 'Shipments',
        description: 'Retrieves all shipments belonging to a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-store', method: 'GET', url: `${BASE}/api/shipments/store/{storeId}`,
        summary: 'Get Shipments by Store', category: 'Shipments',
        description: 'Retrieves all shipments dispatched from a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-status', method: 'GET', url: `${BASE}/api/shipments/status/{shipmentStatus}`,
        summary: 'Get Shipments by Status', category: 'Shipments',
        description: 'Retrieves all shipments filtered by their current delivery status.',
        pathParams: [{ name: 'shipmentStatus', type: 'select', label: 'Shipment Status', required: true, options: ['CREATED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] }]
      },
      {
        id: 'ship-create', method: 'POST', url: `${BASE}/api/shipments`,
        summary: 'Create New Shipment', category: 'Shipments',
        description: 'Creates a new shipment linking a customer, store, and delivery address.',
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'deliveryAddress', type: 'string', label: 'Delivery Address', required: true, placeholder: 'e.g. 123 Main St, Chennai' }
        ]
      },
      {
        id: 'ship-update', method: 'PUT', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Update Shipment', category: 'Shipments',
        description: 'Updates the details of an existing shipment including address.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'deliveryAddress', type: 'string', label: 'Delivery Address', required: true, placeholder: 'e.g. 456 New St, Mumbai' }
        ]
      },
      {
        id: 'ship-patch-status', method: 'PATCH', url: `${BASE}/api/shipments/{shipmentId}/shipmentStatus`,
        summary: 'Update Shipment Status', category: 'Shipments',
        description: 'Updates only the status field of an existing shipment.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [{ name: 'shipmentStatus', type: 'select', label: 'New Status', required: true, options: ['CREATED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] }]
      },
      {
        id: 'ship-delete', method: 'DELETE', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Delete Shipment', category: 'Shipments',
        description: 'Permanently removes a shipment record from the system.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }]
      }
    ]
  },

  {
    id: 'pooja',
    name: 'Pooja',
    username: 'pooja',
    password: '123456',
    role: 'Backend Developer',
    avatar: 'PL',
    color: '#EC4899',
    bgClass: 'member-pink',
    modules: ['Stores API'],
    endpoints: [
      {
        id: 'store-get-all', method: 'GET', url: `${BASE}/api/stores`,
        summary: 'Get All Stores', category: 'Stores',
        description: 'Retrieves a list of all registered stores in the system.',
      },
      {
        id: 'store-get-by-id', method: 'GET', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Get Store by ID', category: 'Stores',
        description: 'Fetches full details of a specific store by its unique identifier.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-create', method: 'POST', url: `${BASE}/api/stores`,
        summary: 'Create New Store', category: 'Stores',
        description: 'Creates a new store record with name, address and location details.',
        bodyFields: [
          { name: 'storeName', type: 'string', label: 'Store Name', required: true, placeholder: 'e.g. Chennai Central' },
          { name: 'webAddress', type: 'string', label: 'Web Address', required: false, placeholder: 'e.g. https://store.example.com' },
          { name: 'physicalAddress', type: 'string', label: 'Physical Address', required: false, placeholder: 'e.g. Anna Salai, Chennai' },
          { name: 'latitude', type: 'number', label: 'Latitude', required: false, placeholder: 'e.g. 13.0827' },
          { name: 'longitude', type: 'number', label: 'Longitude', required: false, placeholder: 'e.g. 80.2707' }
        ]
      },
      {
        id: 'store-update', method: 'PUT', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Update Store', category: 'Stores',
        description: 'Updates the details of an existing store including name and location.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'storeName', type: 'string', label: 'Store Name', required: true, placeholder: 'e.g. Chennai South' },
          { name: 'webAddress', type: 'string', label: 'Web Address', required: false, placeholder: 'e.g. https://newstore.example.com' },
          { name: 'physicalAddress', type: 'string', label: 'Physical Address', required: false, placeholder: 'e.g. T. Nagar, Chennai' },
          { name: 'latitude', type: 'number', label: 'Latitude', required: false, placeholder: 'e.g. 13.0827' },
          { name: 'longitude', type: 'number', label: 'Longitude', required: false, placeholder: 'e.g. 80.2707' }
        ]
      },
      {
        id: 'store-delete', method: 'DELETE', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Delete Store', category: 'Stores',
        description: 'Permanently removes a store record from the system.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-inventory', method: 'GET', url: `${BASE}/api/stores/{storeId}/inventory`,
        summary: 'Get Store Inventory', category: 'Stores',
        description: 'Retrieves inventory records for a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-orders', method: 'GET', url: `${BASE}/api/stores/{storeId}/orders`,
        summary: 'Get Store Orders', category: 'Stores',
        description: 'Retrieves all orders associated with a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-shipments', method: 'GET', url: `${BASE}/api/stores/{storeId}/shipments`,
        summary: 'Get Store Shipments', category: 'Stores',
        description: 'Retrieves all shipments associated with a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      }
    ]
  },

  {
    id: 'karthi',
    name: 'Karthi',
    username: 'karthi',
    password: 'karthi123',
    role: 'Backend Developer',
    avatar: 'KA',
    color: '#3B82F6',
    bgClass: 'member-blue',
    modules: ['Products API', 'Inventory API'],
    endpoints: [
      {
        id: 'prod-get-all', method: 'GET', url: `${BASE}/api/products`,
        summary: 'Get All Products', category: 'Products',
        description: 'Retrieves a complete catalog of all available products.',
      },
      {
        id: 'prod-get-by-id', method: 'GET', url: `${BASE}/api/products/{productId}`,
        summary: 'Get Product by ID', category: 'Products',
        description: 'Fetches the full details of a specific product by its ID.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'prod-create', method: 'POST', url: `${BASE}/api/products`,
        summary: 'Create New Product', category: 'Products',
        description: 'Adds a new product to the catalog with pricing and attributes.',
        bodyFields: [
          { name: 'productName', type: 'string', label: 'Product Name', required: true, placeholder: 'e.g. Wireless Mouse' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 599.99' },
          { name: 'brand', type: 'string', label: 'Brand', required: false, placeholder: 'e.g. Logitech' },
          { name: 'colour', type: 'string', label: 'Colour', required: false, placeholder: 'e.g. Black' },
          { name: 'size', type: 'string', label: 'Size', required: false, placeholder: 'e.g. Medium' },
          { name: 'rating', type: 'number', label: 'Rating (1-5)', required: false, placeholder: 'e.g. 4' }
        ]
      },
      {
        id: 'prod-update', method: 'PUT', url: `${BASE}/api/products/{productId}`,
        summary: 'Update Product', category: 'Products',
        description: 'Updates product details such as price, brand, color, and rating.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'productName', type: 'string', label: 'Product Name', required: true, placeholder: 'e.g. Wireless Mouse Pro' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 649.99' },
          { name: 'brand', type: 'string', label: 'Brand', required: false, placeholder: 'e.g. Logitech' },
          { name: 'colour', type: 'string', label: 'Colour', required: false, placeholder: 'e.g. White' },
          { name: 'size', type: 'string', label: 'Size', required: false, placeholder: 'e.g. Large' },
          { name: 'rating', type: 'number', label: 'Rating (1-5)', required: false, placeholder: 'e.g. 5' }
        ]
      },
      {
        id: 'prod-delete', method: 'DELETE', url: `${BASE}/api/products/{productId}`,
        summary: 'Delete Product', category: 'Products',
        description: 'Permanently removes a product from the catalog.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-get-all', method: 'GET', url: `${BASE}/api/inventory`,
        summary: 'Get All Inventory', category: 'Inventory',
        description: 'Retrieves all inventory records showing stock levels across stores.',
      },
      {
        id: 'inv-get-by-id', method: 'GET', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Get Inventory by ID', category: 'Inventory',
        description: 'Fetches a specific inventory record by its unique identifier.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-create', method: 'POST', url: `${BASE}/api/inventory`,
        summary: 'Create Inventory Record', category: 'Inventory',
        description: 'Creates a new inventory entry linking a store and product with stock count.',
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'productInventory', type: 'number', label: 'Inventory Count', required: true, placeholder: 'e.g. 100' }
        ]
      },
      {
        id: 'inv-update', method: 'PUT', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Update Inventory', category: 'Inventory',
        description: 'Updates the stock quantity and associated store/product of an inventory record.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'productInventory', type: 'number', label: 'Inventory Count', required: true, placeholder: 'e.g. 150' }
        ]
      },
      {
        id: 'inv-delete', method: 'DELETE', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Delete Inventory Record', category: 'Inventory',
        description: 'Removes an inventory record from the system.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-by-store', method: 'GET', url: `${BASE}/api/inventory/store/{storeId}`,
        summary: 'Get Inventory by Store', category: 'Inventory',
        description: 'Returns inventory records filtered by store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-by-product', method: 'GET', url: `${BASE}/api/inventory/product/{productId}`,
        summary: 'Get Inventory by Product', category: 'Inventory',
        description: 'Returns inventory records filtered by product.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      }
    ]
  },

  {
    id: 'admin',
    name: 'Admin',
    username: 'admin',
    password: 'admin123',
    role: 'Administrator',
    avatar: 'AD',
    color: '#EF4444',
    bgClass: 'member-red',
    modules: ['Customers API', 'Orders API', 'Order Items API', 'Shipments API', 'Stores API', 'Products API', 'Inventory API'],
    endpoints: [
      // Customers API
      {
        id: 'cust-get-all', method: 'GET', url: `${BASE}/api/customers`,
        summary: 'Get All Customers', category: 'Customers',
        description: 'Retrieves a complete list of all registered customers in the system.',
      },
      {
        id: 'cust-get-by-id', method: 'GET', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Get Customer by ID', category: 'Customers',
        description: 'Fetches a specific customer record using their unique customer ID.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-get-by-email', method: 'GET', url: `${BASE}/api/customers/search`,
        summary: 'Get Customer by Email', category: 'Customers',
        description: 'Looks up a customer record using their registered email address.',
        queryParams: [{ name: 'email', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. user@example.com' }]
      },
      {
        id: 'cust-get-orders', method: 'GET', url: `${BASE}/api/customers/{customerId}/orders`,
        summary: 'Get Orders of Customer', category: 'Customers',
        description: 'Retrieves all orders placed by a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-get-shipments', method: 'GET', url: `${BASE}/api/customers/{customerId}/shipments`,
        summary: 'Get Shipments of Customer', category: 'Customers',
        description: 'Retrieves all shipments associated with a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'cust-create', method: 'POST', url: `${BASE}/api/customers`,
        summary: 'Create New Customer', category: 'Customers',
        description: 'Creates a new customer record with full name and email address.',
        bodyFields: [
          { name: 'fullName', type: 'string', label: 'Full Name', required: true, placeholder: 'e.g. John Doe' },
          { name: 'emailAddress', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. john@example.com' }
        ]
      },
      {
        id: 'cust-update', method: 'PUT', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Update Customer', category: 'Customers',
        description: 'Updates the name and/or email of an existing customer record.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'fullName', type: 'string', label: 'Full Name', required: true, placeholder: 'e.g. Jane Doe' },
          { name: 'emailAddress', type: 'string', label: 'Email Address', required: true, placeholder: 'e.g. jane@example.com' }
        ]
      },
      {
        id: 'cust-delete', method: 'DELETE', url: `${BASE}/api/customers/{customerId}`,
        summary: 'Delete Customer', category: 'Customers',
        description: 'Permanently removes a customer record from the system by their ID.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      // Orders API
      {
        id: 'ord-get-all', method: 'GET', url: `${BASE}/api/orders`,
        summary: 'Get All Orders', category: 'Orders',
        description: 'Retrieves a complete list of all orders placed in the system.',
      },
      {
        id: 'ord-get-by-id', method: 'GET', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Get Order by ID', category: 'Orders',
        description: 'Fetches a specific order by its unique identifier.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-count', method: 'GET', url: `${BASE}/api/orders/count`,
        summary: 'Get Orders Count by Status', category: 'Orders',
        description: 'Returns the total count of orders filtered by their processing status.',
        queryParams: [{ name: 'status', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-create', method: 'POST', url: `${BASE}/api/orders`,
        summary: 'Create New Order', category: 'Orders',
        description: 'Creates a new order for a customer from a specific store with a given status.',
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'orderStatusS', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] },
          { name: 'orderTms', type: 'datetime', label: 'Order Timestamp', required: false, placeholder: '2024-01-15T10:30:00' }
        ]
      },
      {
        id: 'ord-update', method: 'PUT', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Update Order Store or Customer', category: 'Orders',
        description: 'Updates order links by passing either storeId or customerId query parameter.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: false, placeholder: 'e.g. 2' },
          { name: 'customerId', type: 'number', label: 'Customer ID', required: false, placeholder: 'e.g. 3' }
        ]
      },
      {
        id: 'ord-by-customer', method: 'GET', url: `${BASE}/api/orders/customer/{customerId}`,
        summary: 'Get Orders by Customer', category: 'Orders',
        description: 'Returns all orders for a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-by-store', method: 'GET', url: `${BASE}/api/orders/store/{storeId}`,
        summary: 'Get Orders by Store', category: 'Orders',
        description: 'Returns all orders for a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ord-by-status', method: 'GET', url: `${BASE}/api/orders/status/{status}`,
        summary: 'Get Orders by Status', category: 'Orders',
        description: 'Returns all orders with a specific status.',
        pathParams: [{ name: 'status', type: 'select', label: 'Order Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-by-date-range', method: 'GET', url: `${BASE}/api/orders/date-range`,
        summary: 'Get Orders by Date Range', category: 'Orders',
        description: 'Returns orders between two timestamps.',
        queryParams: [
          { name: 'from', type: 'datetime', label: 'From', required: true, placeholder: '2026-04-01T00:00:00' },
          { name: 'to', type: 'datetime', label: 'To', required: true, placeholder: '2026-04-30T23:59:59' }
        ]
      },
      {
        id: 'ord-update-status', method: 'PATCH', url: `${BASE}/api/orders/{orderId}/status`,
        summary: 'Update Order Status', category: 'Orders',
        description: 'Updates the processing status of an existing order to a new value.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [{ name: 'status', type: 'select', label: 'New Status', required: true, options: ['OPEN', 'PAID', 'SHIPPED', 'COMPLETE', 'CANCELLED', 'REFUNDED'] }]
      },
      {
        id: 'ord-delete', method: 'DELETE', url: `${BASE}/api/orders/{orderId}`,
        summary: 'Delete Order', category: 'Orders',
        description: 'Permanently removes an order record from the system.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      // Order Items API
      {
        id: 'oi-get-by-order', method: 'GET', url: `${BASE}/api/orders/{orderId}/items`,
        summary: 'Get Items by Order', category: 'Order Items',
        description: 'Fetches all line items (products) that belong to a specific order.',
        pathParams: [{ name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'oi-add', method: 'POST', url: `${BASE}/api/orders/{orderId}/items`,
        summary: 'Add Item to Order', category: 'Order Items',
        description: 'Adds a new line item to an existing order for a specific product.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' }
        ],
        queryParams: [
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 2' }
        ],
        bodyFields: [
          { name: 'quantity', type: 'number', label: 'Quantity', required: true, placeholder: 'e.g. 3' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 29.99' }
        ]
      },
      {
        id: 'oi-update', method: 'PUT', url: `${BASE}/api/orders/{orderId}/items/{lineItemId}`,
        summary: 'Update Order Item', category: 'Order Items',
        description: 'Updates the quantity and/or unit price of an existing order line item.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' },
          { name: 'lineItemId', type: 'number', label: 'Line Item ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'quantity', type: 'number', label: 'Quantity', required: true, placeholder: 'e.g. 5' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 24.99' }
        ]
      },
      {
        id: 'oi-delete', method: 'DELETE', url: `${BASE}/api/orders/{orderId}/items/{lineItemId}`,
        summary: 'Delete Order Item', category: 'Order Items',
        description: 'Removes a specific line item from an order permanently.',
        pathParams: [
          { name: 'orderId', type: 'number', label: 'Order ID', required: true, placeholder: 'e.g. 1' },
          { name: 'lineItemId', type: 'number', label: 'Line Item ID', required: true, placeholder: 'e.g. 1' }
        ]
      },
      // Shipments API
      {
        id: 'ship-get-all', method: 'GET', url: `${BASE}/api/shipments`,
        summary: 'Get All Shipments', category: 'Shipments',
        description: 'Retrieves a list of all shipments recorded in the system.',
      },
      {
        id: 'ship-get-by-id', method: 'GET', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Get Shipment by ID', category: 'Shipments',
        description: 'Fetches the full details of a specific shipment by its ID.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-customer', method: 'GET', url: `${BASE}/api/shipments/customer/{customerId}`,
        summary: 'Get Shipments by Customer', category: 'Shipments',
        description: 'Retrieves all shipments belonging to a specific customer.',
        pathParams: [{ name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-store', method: 'GET', url: `${BASE}/api/shipments/store/{storeId}`,
        summary: 'Get Shipments by Store', category: 'Shipments',
        description: 'Retrieves all shipments dispatched from a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'ship-by-status', method: 'GET', url: `${BASE}/api/shipments/status/{shipmentStatus}`,
        summary: 'Get Shipments by Status', category: 'Shipments',
        description: 'Retrieves all shipments filtered by their current delivery status.',
        pathParams: [{ name: 'shipmentStatus', type: 'select', label: 'Shipment Status', required: true, options: ['CREATED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] }]
      },
      {
        id: 'ship-create', method: 'POST', url: `${BASE}/api/shipments`,
        summary: 'Create New Shipment', category: 'Shipments',
        description: 'Creates a new shipment linking a customer, store, and delivery address.',
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'deliveryAddress', type: 'string', label: 'Delivery Address', required: true, placeholder: 'e.g. 123 Main St, Chennai' }
        ]
      },
      {
        id: 'ship-update', method: 'PUT', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Update Shipment', category: 'Shipments',
        description: 'Updates the details of an existing shipment including address.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'customerId', type: 'number', label: 'Customer ID', required: true, placeholder: 'e.g. 1' },
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'deliveryAddress', type: 'string', label: 'Delivery Address', required: true, placeholder: 'e.g. 456 New St, Mumbai' }
        ]
      },
      {
        id: 'ship-patch-status', method: 'PATCH', url: `${BASE}/api/shipments/{shipmentId}/shipmentStatus`,
        summary: 'Update Shipment Status', category: 'Shipments',
        description: 'Updates only the status field of an existing shipment.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [{ name: 'shipmentStatus', type: 'select', label: 'New Status', required: true, options: ['CREATED', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED'] }]
      },
      {
        id: 'ship-delete', method: 'DELETE', url: `${BASE}/api/shipments/{shipmentId}`,
        summary: 'Delete Shipment', category: 'Shipments',
        description: 'Permanently removes a shipment record from the system.',
        pathParams: [{ name: 'shipmentId', type: 'number', label: 'Shipment ID', required: true, placeholder: 'e.g. 1' }]
      },
      // Stores API
      {
        id: 'store-get-all', method: 'GET', url: `${BASE}/api/stores`,
        summary: 'Get All Stores', category: 'Stores',
        description: 'Retrieves a list of all registered stores in the system.',
      },
      {
        id: 'store-get-by-id', method: 'GET', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Get Store by ID', category: 'Stores',
        description: 'Fetches full details of a specific store by its unique identifier.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-create', method: 'POST', url: `${BASE}/api/stores`,
        summary: 'Create New Store', category: 'Stores',
        description: 'Creates a new store record with name, address and location details.',
        bodyFields: [
          { name: 'storeName', type: 'string', label: 'Store Name', required: true, placeholder: 'e.g. Chennai Central' },
          { name: 'webAddress', type: 'string', label: 'Web Address', required: false, placeholder: 'e.g. https://store.example.com' },
          { name: 'physicalAddress', type: 'string', label: 'Physical Address', required: false, placeholder: 'e.g. Anna Salai, Chennai' },
          { name: 'latitude', type: 'number', label: 'Latitude', required: false, placeholder: 'e.g. 13.0827' },
          { name: 'longitude', type: 'number', label: 'Longitude', required: false, placeholder: 'e.g. 80.2707' }
        ]
      },
      {
        id: 'store-update', method: 'PUT', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Update Store', category: 'Stores',
        description: 'Updates the details of an existing store including name and location.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'storeName', type: 'string', label: 'Store Name', required: true, placeholder: 'e.g. Chennai South' },
          { name: 'webAddress', type: 'string', label: 'Web Address', required: false, placeholder: 'e.g. https://newstore.example.com' },
          { name: 'physicalAddress', type: 'string', label: 'Physical Address', required: false, placeholder: 'e.g. T. Nagar, Chennai' },
          { name: 'latitude', type: 'number', label: 'Latitude', required: false, placeholder: 'e.g. 13.0827' },
          { name: 'longitude', type: 'number', label: 'Longitude', required: false, placeholder: 'e.g. 80.2707' }
        ]
      },
      {
        id: 'store-delete', method: 'DELETE', url: `${BASE}/api/stores/{storeId}`,
        summary: 'Delete Store', category: 'Stores',
        description: 'Permanently removes a store record from the system.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-inventory', method: 'GET', url: `${BASE}/api/stores/{storeId}/inventory`,
        summary: 'Get Store Inventory', category: 'Stores',
        description: 'Retrieves inventory records for a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-orders', method: 'GET', url: `${BASE}/api/stores/{storeId}/orders`,
        summary: 'Get Store Orders', category: 'Stores',
        description: 'Retrieves all orders associated with a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'store-get-shipments', method: 'GET', url: `${BASE}/api/stores/{storeId}/shipments`,
        summary: 'Get Store Shipments', category: 'Stores',
        description: 'Retrieves all shipments associated with a specific store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      // Products API
      {
        id: 'prod-get-all', method: 'GET', url: `${BASE}/api/products`,
        summary: 'Get All Products', category: 'Products',
        description: 'Retrieves a complete catalog of all available products.',
      },
      {
        id: 'prod-get-by-id', method: 'GET', url: `${BASE}/api/products/{productId}`,
        summary: 'Get Product by ID', category: 'Products',
        description: 'Fetches the full details of a specific product by its ID.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'prod-create', method: 'POST', url: `${BASE}/api/products`,
        summary: 'Create New Product', category: 'Products',
        description: 'Adds a new product to the catalog with pricing and attributes.',
        bodyFields: [
          { name: 'productName', type: 'string', label: 'Product Name', required: true, placeholder: 'e.g. Wireless Mouse' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 599.99' },
          { name: 'brand', type: 'string', label: 'Brand', required: false, placeholder: 'e.g. Logitech' },
          { name: 'colour', type: 'string', label: 'Colour', required: false, placeholder: 'e.g. Black' },
          { name: 'size', type: 'string', label: 'Size', required: false, placeholder: 'e.g. Medium' },
          { name: 'rating', type: 'number', label: 'Rating (1-5)', required: false, placeholder: 'e.g. 4' }
        ]
      },
      {
        id: 'prod-update', method: 'PUT', url: `${BASE}/api/products/{productId}`,
        summary: 'Update Product', category: 'Products',
        description: 'Updates product details such as price, brand, color, and rating.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }],
        bodyFields: [
          { name: 'productName', type: 'string', label: 'Product Name', required: true, placeholder: 'e.g. Wireless Mouse Pro' },
          { name: 'unitPrice', type: 'number', label: 'Unit Price', required: true, placeholder: 'e.g. 649.99' },
          { name: 'brand', type: 'string', label: 'Brand', required: false, placeholder: 'e.g. Logitech' },
          { name: 'colour', type: 'string', label: 'Colour', required: false, placeholder: 'e.g. White' },
          { name: 'size', type: 'string', label: 'Size', required: false, placeholder: 'e.g. Large' },
          { name: 'rating', type: 'number', label: 'Rating (1-5)', required: false, placeholder: 'e.g. 5' }
        ]
      },
      {
        id: 'prod-delete', method: 'DELETE', url: `${BASE}/api/products/{productId}`,
        summary: 'Delete Product', category: 'Products',
        description: 'Permanently removes a product from the catalog.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      },
      // Inventory API
      {
        id: 'inv-get-all', method: 'GET', url: `${BASE}/api/inventory`,
        summary: 'Get All Inventory', category: 'Inventory',
        description: 'Retrieves all inventory records showing stock levels across stores.',
      },
      {
        id: 'inv-get-by-id', method: 'GET', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Get Inventory by ID', category: 'Inventory',
        description: 'Fetches a specific inventory record by its unique identifier.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-create', method: 'POST', url: `${BASE}/api/inventory`,
        summary: 'Create Inventory Record', category: 'Inventory',
        description: 'Creates a new inventory entry linking a store and product with stock count.',
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'productInventory', type: 'number', label: 'Inventory Count', required: true, placeholder: 'e.g. 100' }
        ]
      },
      {
        id: 'inv-update', method: 'PUT', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Update Inventory', category: 'Inventory',
        description: 'Updates the stock quantity and associated store/product of an inventory record.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }],
        queryParams: [
          { name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' },
          { name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }
        ],
        bodyFields: [
          { name: 'productInventory', type: 'number', label: 'Inventory Count', required: true, placeholder: 'e.g. 150' }
        ]
      },
      {
        id: 'inv-delete', method: 'DELETE', url: `${BASE}/api/inventory/{inventoryId}`,
        summary: 'Delete Inventory Record', category: 'Inventory',
        description: 'Removes an inventory record from the system.',
        pathParams: [{ name: 'inventoryId', type: 'number', label: 'Inventory ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-by-store', method: 'GET', url: `${BASE}/api/inventory/store/{storeId}`,
        summary: 'Get Inventory by Store', category: 'Inventory',
        description: 'Returns inventory records filtered by store.',
        pathParams: [{ name: 'storeId', type: 'number', label: 'Store ID', required: true, placeholder: 'e.g. 1' }]
      },
      {
        id: 'inv-by-product', method: 'GET', url: `${BASE}/api/inventory/product/{productId}`,
        summary: 'Get Inventory by Product', category: 'Inventory',
        description: 'Returns inventory records filtered by product.',
        pathParams: [{ name: 'productId', type: 'number', label: 'Product ID', required: true, placeholder: 'e.g. 1' }]
      }
    ]
  }
];
