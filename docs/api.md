# Cherie Amour Craftz API

## Store

GET /api/store
Returns the public store profile.

## Products

GET /api/products
Returns all active products.

GET /api/products/{productId}
Returns a single product with:

- Images
- Inventory

## Inventory

GET /api/inventory
Returns inventory records and adjustment history.

## Custom Requests

POST /api/custom-requests
Creates a new custom crochet request.

Request body includes:

- Customer information
- Project description
- Body measurements
- Requested deadline
- Inspiration image URL

## Orders

POST /api/orders
Creates a customer order and associated order items.

## Future Endpoints

- PUT /api/products/{id} — Update an existing product
- DELETE /api/products/{id} — Delete a product
- PATCH /api/orders/{id}/status — Update an order’s status
- POST /api/payments — Process customer payments
- POST /api/upload — Upload product and inspiration images
