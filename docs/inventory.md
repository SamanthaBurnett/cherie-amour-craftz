# Inventory Workflow Notes

## Current Inventory Capabilities

Cherie Amour Craftz tracks inventory for products through dedicated inventory records.

Current capabilities include:

- View inventory from the admin dashboard.
- Manually adjust stock levels.
- Prevent inventory from going below zero.
- Automatically recalculate inventory status after adjustments.
- Record inventory adjustment history.
- Display inventory status badges.
- Display sold out badges on customer-facing product cards.

## Inventory Status Rules

Inventory status is calculated from quantity and low stock threshold.

Rules:

- `quantityOnHand <= 0` → `OUT_OF_STOCK`
- `quantityOnHand <= lowStockThreshold` → `LOW_STOCK`
- `quantityOnHand > lowStockThreshold` → `IN_STOCK`

The shared helper lives in:

```txt
lib/inventory.ts
```

This prevents multiple APIs from implementing the same inventory rules differently.

## Stock Adjustments

Admins can adjust inventory by entering a positive or negative change amount.

Examples:

- +5 for restock
- -1 for damaged item
- -2 for correction
- +3 for returned items
  Each stock adjustment creates an inventory adjustment history record.

## Inventory History

Inventory history records:

- Quantity change
- Reason
- Notes
- Timestamp
  This creates an audit trail so the owner can understand why inventory changed.

## Storefront Behavior

Customer-facing product cards show inventory state through badges.

Current behavior:

- Sold-out products remain visible.
- Sold-out products show a Sold Out badge.
- Low-stock products show a Low Stock badge.
- Product cards still link to the product detail page.
- Sold-out products are not hidden by default because the business may later support:
- - Restock notifications
- - Waitlists
- - Custom remake requests

### Future Improvements

- Add configurable setting to show or hide sold-out products.
- Add “Notify me when restocked” for sold-out products.
- Cap inventory history shown on each card.
- Add “View all history” page for full adjustment history.
- Track which admin made each inventory adjustment.
- Prevent accidental number input scroll changes.
- Clean up duplicate low-stock/out-of-stock messaging.
- Add stronger validation and error messages.
