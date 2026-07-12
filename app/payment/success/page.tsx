import Link from "next/link";
import { notFound } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { ClearCartAfterPayment } from "@/components/payment/ClearCartAfterPayment";

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    notFound();
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

  const paymentWasSuccessful = checkoutSession.payment_status === "paid";

  if (!paymentWasSuccessful) {
    return (
      <PageContainer>
        <Card className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-3xl text-coral">Payment processing</p>

          <h1 className="mt-4 text-4xl font-bold text-text">
            We’re checking your payment.
          </h1>

          <p className="mt-4 text-text-muted">
            Your payment has not been confirmed yet. Please do not submit
            another payment while processing completes.
          </p>

          <div className="mt-8">
            <Link href="/">
              <Button variant="secondary">Back Home</Button>
            </Link>
          </div>
        </Card>
      </PageContainer>
    );
  }

  const orderId =
    checkoutSession.metadata?.orderId ?? checkoutSession.client_reference_id;

  return (
    <PageContainer>
      <ClearCartAfterPayment />

      <Card className="mx-auto max-w-2xl text-center">
        <p className="font-accent text-3xl text-coral">Thank you!</p>

        <h1 className="mt-4 text-4xl font-bold text-text">
          Your payment was successful.
        </h1>

        <p className="mt-4 text-text-muted">
          Cherie Amour Craftz received your payment. Your order will be
          processed and you’ll receive updates as it moves forward.
        </p>

        {orderId && (
          <div className="mt-6 rounded-2xl bg-surface p-4">
            <p className="text-sm text-text-muted">Order reference</p>

            <p className="mt-1 break-all font-semibold text-text">{orderId}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>

          <Link href="/">
            <Button variant="secondary">Back Home</Button>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}
