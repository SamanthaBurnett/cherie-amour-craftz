# Refund Workflow Notes

## Current Scope

Cherie Amour Craftz currently supports successful Stripe Checkout payments.

Refund execution is intentionally deferred until the admin refund workflow is designed and secured.

The current `PaymentStatus` enum already supports:

- `PAID`

- `REFUNDED`

- `PARTIALLY_REFUNDED`

## Future Refund Workflow

The intended refund flow is:

1. Admin opens a paid order.

2. Admin chooses full or partial refund.

3. Admin enters the refund amount and reason.

4. Application displays a confirmation step.

5. Server loads the trusted order and Stripe Payment Intent ID.

6. Server creates the refund through Stripe.

7. Stripe sends a refund webhook.

8. Application updates the local payment status.

9. Refund details are recorded for audit purposes.

10. Customer receives a refund notification.

## Required Safety Rules

Refunds must:

- Be available only to approved admins.

- Require a paid order.

- Use the stored Stripe Payment Intent ID.

- Never trust the refund amount sent by the browser without server validation.

- Prevent refunds above the remaining refundable amount.

- Require confirmation before submission.

- Record the refund reason.

- Handle duplicate webhook deliveries safely.

- Avoid changing fulfillment or inventory automatically without an explicit business rule.

## Full Refund

After Stripe confirms a full refund:

```txt

paymentStatus = REFUNDED

The application should store:

Stripe refund ID
Refunded amount
Refund reason
Refund timestamp
Admin who initiated the refund
Partial Refund

After Stripe confirms a partial refund:

paymentStatus = PARTIALLY_REFUNDED

The application should track the total amount refunded so future refunds cannot exceed the original payment.

Inventory Decision

Refunding money should not automatically restore inventory.

The item may have been:

returned and reusable;
damaged;
already shipped;
never physically returned.
Inventory restoration should be a separate admin action after the product is inspected.

Future Database Additions

A future Refund model may include:

model Refund {

  id             String   @id @default(cuid())

  orderId        String

  stripeRefundId String   @unique

  amount         Decimal

  reason         String?

  createdAt      DateTime @default(now())



  order Order @relation(fields: [orderId], references: [id])

}

Additional fields may include:

initiatedByAdminId
status
failureReason
updatedAt
Future Stripe Events

The refund workflow should process relevant Stripe refund events and treat Stripe webhooks as the source of truth for final refund state.

Deferred Admin Features

Future implementation should add:

Refund button on paid orders
Full or partial refund form
Confirmation dialog
Refund history
Refund status display
Admin audit logging
Customer refund email
```
