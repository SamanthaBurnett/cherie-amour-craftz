# Payment Workflow Notes

## Overview

Cherie Amour Craftz uses Stripe-hosted Checkout for one-time customer payments.

The application owns:

- Product data

- Product prices

- Orders

- Order items

- Customers

- Inventory

- Payment status

Stripe handles:

- Secure payment collection

- Card information

- Payment processing

- Checkout Session events

- Payment Intent creation

- Payment confirmation

The application does not collect or store customer card information.

## Current Payment Flow

The current payment flow is:

1. Customer adds products to the bag.

2. Customer enters contact and shipping information.

3. The application creates an unpaid order in PostgreSQL.

4. The application sends the internal order ID to the payment API.

5. The server loads trusted order and product data from PostgreSQL.

6. The server creates a Stripe Checkout Session.

7. The customer is redirected to Stripe-hosted Checkout.

8. Stripe processes the payment.

9. Stripe sends a signed webhook event to the application.

10. The application verifies the webhook signature.

11. The application marks the order as paid.

12. The application reduces inventory.

13. The application records inventory adjustment history.

14. The customer returns to the payment success page.

15. The customer’s local bag is cleared.

## Payment and Order Statuses

Order fulfillment status and payment status are separate.

The order status describes the fulfillment lifecycle, such as:

- `PENDING`

- `ACCEPTED`

- `WORKING`

- `READY`

- `SHIPPED`

- `DELIVERED`

The payment status describes the payment lifecycle:

- `UNPAID`

- `PROCESSING`

- `PAID`

- `FAILED`

- `REFUNDED`

- `PARTIALLY_REFUNDED`

An order can therefore be:

```txt

paymentStatus = PAID

orderStatus = PENDING

This means the customer paid, but fulfillment has not started yet.

Order Payment Fields

The Order model stores:

paymentStatus           PaymentStatus @default(UNPAID)

stripeCheckoutSessionId String?       @unique

stripePaymentIntentId   String?       @unique

paidAt                  DateTime?

These fields allow the application to reconcile its internal orders with Stripe.

Trusted Pricing

The browser sends only the internal order ID when requesting a Checkout Session.

The payment API loads:

Order items
Product information
Quantities
Stored unit prices
Shipping
Tax
from PostgreSQL.

The server does not trust prices submitted by the browser.

This prevents a customer from modifying a frontend request to pay a lower amount.

Stripe Checkout Session

The Checkout Session is created in:

app/api/payments/checkout/route.ts

The Session includes the internal order ID through:

client_reference_id: order.id



metadata: {

  orderId: order.id

}

The Payment Intent also receives the order ID in its metadata.

This allows webhook events to be matched to the correct database order.

Payment Return Pages

The Checkout Session redirects to:

/payment/success

after successful payment, or:

/payment/cancel

when the customer leaves Stripe Checkout without completing payment.

The success page:

Retrieves the Checkout Session from Stripe.
Confirms that Stripe reports the Session as paid.
Displays the internal order reference.
Clears the customer’s local bag.
The success page does not mark the order paid.

The verified webhook remains the source of truth for database payment status.

The cancellation page:

Explains that payment was not completed.
Keeps the customer’s bag intact.
Allows the customer to return to checkout.
Displays the internal order reference when available.
Stripe Webhook

The webhook endpoint is:

app/api/webhooks/stripe/route.ts

It verifies the request using:

STRIPE_WEBHOOK_SECRET

The route processes:

checkout.session.completed
checkout.session.async_payment_succeeded
checkout.session.async_payment_failed
checkout.session.expired
Successful payment

After a verified successful payment, the application:

Locates the internal order.
Confirms that it has not already been fulfilled.
Marks the payment status as PAID.
Stores the Stripe Checkout Session ID.
Stores the Stripe Payment Intent ID.
Records the payment timestamp.
Reduces inventory.
Recalculates inventory status.
Creates an ORDER_PLACED inventory adjustment.
These changes run inside a database transaction.

If one operation fails, the transaction rolls back.

Failed or expired payment

When Stripe reports an asynchronous failure or expired Checkout Session, the application marks a non-paid order as:

FAILED

Inventory remains unchanged.

Duplicate Webhook Protection

Stripe may deliver the same event more than once.

The webhook atomically claims the order before adjusting inventory.

If the order is already marked PAID, the repeated event exits without:

Reducing inventory again
Creating another adjustment
Reprocessing fulfillment
This prevents duplicate webhook deliveries from causing duplicate business actions.

Inventory Timing

Inventory is not permanently reduced when the unpaid order is initially created.

Inventory is reduced only after Stripe confirms payment through a verified webhook.

This avoids permanently losing stock when a customer:

Abandons Checkout
Cancels payment
Closes the browser
Has a failed payment
The current implementation checks availability when the order is created and checks it again before reducing stock after payment.

A future version may introduce temporary inventory reservations to better handle multiple customers attempting to buy the final unit simultaneously.

Environment Variables

Local development requires:

STRIPE_SECRET_KEY="sk_test_..."

STRIPE_WEBHOOK_SECRET="whsec_..."

STRIPE_SECRET_KEY is the Stripe sandbox secret API key.

STRIPE_WEBHOOK_SECRET is provided by the active Stripe CLI listener during local development.

Neither value should be committed to source control.

Local Development

Start the Next.js application:

npm run dev

In a separate terminal, authenticate the Stripe CLI:

stripe login

Forward Stripe events to the local webhook:

stripe listen --forward-to localhost:3000/api/webhooks/stripe

Copy the displayed whsec_... value into .env.

After changing .env, save the file and restart the Next.js application.

Sandbox Payment Testing

Use Stripe’s standard successful test card:

4242 4242 4242 4242

Use:

Any future expiration date
Any three-digit CVC
Any valid-looking postal code
Expected successful-payment result:

Stripe Checkout completes.
The customer reaches /payment/success.
The bag clears.
The order becomes PAID.
paidAt is populated.
Stripe IDs are stored.
Inventory decreases once.
An inventory adjustment is created.
Expected cancelled-payment result:

The customer reaches /payment/cancel.
The bag remains intact.
Inventory remains unchanged.
The order is not marked paid.
Current Tax Behavior

The application currently calculates estimated tax within its own checkout flow.

Stripe Tax is not currently enabled.

Before production launch, the business owner should determine:

Where the business has tax obligations
Whether registration is required
Which products are taxable
Whether Stripe Tax should be enabled
How tax should be displayed and reported
Tax settings should not be enabled without the correct business and registration information.

Current Shipping Behavior

Shipping is currently calculated by application logic before the Stripe Checkout Session is created.

Future improvements may include:

Configurable shipping rates
Shipping zones
Free-shipping thresholds
Carrier-calculated shipping
Delivery and pickup options
Refunds

Refund execution is not currently implemented.

The planned refund workflow and safety requirements are documented in:

docs/refunds.md

Payment statuses already support full and partial refunds for future implementation.

Current Limitations

No temporary inventory reservation exists during Stripe Checkout.
Tax behavior is not production-configured.
Shipping rates are not configurable by the admin.
Refund execution is deferred.
Failed or abandoned orders do not yet have an admin cleanup screen.
Customer payment receipts and order emails are handled in a later notifications milestone.
Live Stripe keys and production webhooks are not configured yet.
The application currently supports one-time payments only.
Production Launch Requirements

Before accepting real customer payments:

Complete and verify the Stripe business account.
Add the production domain.
Replace sandbox keys with live Stripe keys.
Create a production webhook endpoint in Stripe.
Add the production webhook signing secret.
Confirm webhook delivery in the deployed environment.
Determine and configure tax requirements.
Confirm shipping rules and pricing.
Test successful, cancelled, failed, and duplicate payment events.
Confirm inventory is reduced exactly once.
Confirm production secrets are stored securely.
Confirm customer and owner notifications work.
Review refund and cancellation policies.
Perform a small real-payment test before public launch.
Relevant Files

lib/stripe.ts

app/api/payments/checkout/route.ts

app/api/webhooks/stripe/route.ts

app/payment/success/page.tsx

app/payment/cancel/page.tsx

components/payment/ClearCartAfterPayment.tsx

context/CartContext.tsx

docs/refunds.md
```
