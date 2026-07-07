import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";

export default function OrderConfirmationPage() {
  return (
    <PageContainer>
      <Card className="mx-auto max-w-2xl text-center">
        <p className="font-accent text-3xl text-coral">Thank you!</p>

        <h1 className="mt-4 text-4xl font-bold text-text">
          Your order was received.
        </h1>

        <p className="mt-4 text-text-muted">
          Cherie Amour Craftz has received your order request. Payment and order
          updates will be handled in a future milestone.
        </p>

        <div className="mt-8 flex justify-center gap-3">
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
