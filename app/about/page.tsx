import { Card } from "@/components/ui/Card";

import { PageContainer } from "@/components/ui/PageContainer";

import { SectionHeader } from "@/components/ui/SectionHeader";

export default function AboutPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="About"
        title="Handmade with care"
        description="Cherie Amour Craftz creates custom crochet pieces designed around personal style, comfort, and fit."
      />

      <Card className="mx-auto mt-10 max-w-3xl">
        <p className="text-text-muted">
          This space will tell the story behind the brand, the maker, and the
          love behind every handmade piece.
        </p>
      </Card>
    </PageContainer>
  );
}
