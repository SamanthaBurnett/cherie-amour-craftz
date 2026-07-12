import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";

type PaymentCancelPageProps = {
  searchParams: Promise<{
    order_id?: string;
  }>;
};

export default async function PaymentCancelPage({
  searchParams,
}: PaymentCancelPageProps) {
  const { order_id: orderId } = await searchParams;

  return (
    <PageContainer>
      <Card className="mx-auto max-w-2xl text-center">
        <p className="font-accent text-3xl text-coral">Payment cancelled</p>

        <h1 className="mt-4 text-4xl font-bold text-text">
          Your payment was not completed.
        </h1>

        <p className="mt-4 text-text-muted">
          Nothing was charged, and the items remain in your bag. You can return
          to checkout whenever you’re ready.
        </p>

        {orderId && (
          <p className="mt-4 text-xs text-text-muted">
            Order reference: {orderId}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/checkout">
            <Button>Return to Checkout</Button>
          </Link>

          <Link href="/cart">
            <Button variant="secondary">View Bag</Button>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}
