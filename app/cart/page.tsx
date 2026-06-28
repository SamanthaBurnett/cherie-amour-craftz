import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function CartPage() {
  const hasItems = false;

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Your Bag"
        title="Review your pieces"
        description="Your selected crochet pieces will appear here before checkout."
      />

      <div className="mt-10">
        {hasItems ? (
          <Card>
            <p>Cart item placeholder</p>

            <Button className="mt-6">Complete Your Order</Button>
          </Card>
        ) : (
          <EmptyState
            title="Your bag is empty"
            description="Start shopping or request a custom piece made just for you."
            actionLabel="Shop Pieces"
          />
        )}
      </div>
    </PageContainer>
  );
}
