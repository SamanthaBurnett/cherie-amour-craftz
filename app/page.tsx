import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Cherie Amour Craftz"
        title="Custom crochet pieces made with love."
        description="Handmade pieces for beach days, golden hours, and custom fits."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Card>
          <Badge>New</Badge>
          <h3 className="mt-4 text-xl font-semibold">Ready-made pieces</h3>
          <p className="mt-2 text-text-muted">
            Shop available crochet pieces made for everyday beauty.
          </p>
          <Button className="mt-6">Shop Now</Button>
        </Card>

        <Card>
          <Badge variant="custom">Custom</Badge>
          <h3 className="mt-4 text-xl font-semibold">Custom orders</h3>
          <p className="mt-2 text-text-muted">
            Send your measurements and inspiration for a piece made just for
            you.
          </p>
          <Button variant="secondary" className="mt-6">
            Start Request
          </Button>
        </Card>

        <Card>
          <Badge variant="low-stock">Inventory</Badge>
          <h3 className="mt-4 text-xl font-semibold">Limited drops</h3>
          <p className="mt-2 text-text-muted">
            Keep track of handmade pieces before they sell out.
          </p>

          <Button variant="ghost" className="mt-6">
            View Drops
          </Button>
        </Card>
      </div>

      <div className="mt-16">
        <SectionHeader
          eyebrow="Featured Pieces"
          title="Soft colors, custom details, handmade charm."
          description="A preview of how product cards will look once inventory is connected."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ProductCard
            name="Golden Hour Crochet Bag"
            price="$65"
            description="A lightweight beach-ready bag with soft pastel details."
          />

          <ProductCard
            name="Custom Crochet Top"
            price="From $85"
            description="Made-to-measure crochet top designed around your style and fit."
            badge="custom"
          />

          <ProductCard
            name="Blush Market Tote"
            price="$58"
            description="Roomy, soft, and perfect for everyday coastal living."
            badge="low-stock"
          />
        </div>
      </div>
    </PageContainer>
  );
}
