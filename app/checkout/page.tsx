import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function CheckoutPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Checkout"
        title="Complete your order"
        description="Payment and order details will be connected in a later milestone."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <div className="grid gap-4">
            <Input label="Full name" name="fullName" />

            <Input label="Email" name="email" type="email" />

            <Input label="Shipping address" name="shippingAddress" />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <p className="mt-4 text-text-muted">Subtotal placeholder</p>

          <Button className="mt-6 w-full">Continue to Payment</Button>
        </Card>
      </div>
    </PageContainer>
  );
}
