import { ProductCard } from "@/components/ProductCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ShopPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Shop"
        title="Ready-made crochet pieces"
        description="Browse handmade pieces available for purchase."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ProductCard
          name="Golden Hour Crochet Bag"
          price="$65"
          description="A soft, beach-ready crochet bag with pastel details."
        />

        <ProductCard
          name="Blush Market Tote"
          price="$58"
          description="A roomy handmade tote for everyday use."
          badge="low-stock"
        />

        <ProductCard
          name="Custom Crochet Top"
          price="From $85"
          description="A made-to-measure crochet top designed around your fit."
          badge="custom"
        />
      </div>
    </PageContainer>
  );
}
