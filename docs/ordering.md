# Ordering Notes

## Current Ordering Flow

Customers can place an order from the checkout page.

Current flow:

- Customer adds products to bag.
- Customer completes checkout form.
- Frontend sends cart items to `POST /api/orders`.
- API creates or updates the customer.
- API creates the order.
- API creates order items.
- API reduces inventory.
- API creates inventory adjustment records.
- Customer is redirected to the order confirmation page.

## Current Limitations

- No payment is collected yet.
- No email is sent yet.
- Shipping address is collected in the UI but not persisted yet.
- Order confirmation page does not show the order ID yet.

## Future Email Notifications

Email notifications will be added in a later milestone using Resend.

Planned customer emails:

- Order received
- Payment confirmed
- Work started
- Ready
- Shipped

Planned owner emails:

- New order
- New custom request
- Low inventory

## Future Improvements

- Persist shipping address.
- Show order ID on confirmation page.
- Send confirmation email after successful order.
- Add validation for customer information.
- Prevent checkout when cart is empty.
- Add payment status once Stripe is integrated.
