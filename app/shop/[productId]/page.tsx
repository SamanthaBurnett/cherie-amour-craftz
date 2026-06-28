import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";

export default function ProductDetailsPage() {
  return (
    <PageContainer>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="min-h-105 rounded-card bg-surface" />

        <Card>
          <p className="text-sm font-medium text-coral">Ready-made piece</p>

          <h1 className="mt-3 text-4xl font-bold">Golden Hour Crochet Bag</h1>

          <p className="mt-4 text-2xl font-semibold">$65</p>

          <p className="mt-4 text-text-muted">
            A handmade crochet bag designed for beach days, market runs, and
            golden hour plans.
          </p>

          <div className="mt-8 flex gap-3">
            <Button>Add to Bag</Button>

            <Button variant="secondary">Ask a Question</Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
