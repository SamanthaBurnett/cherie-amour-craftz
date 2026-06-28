import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/Textarea";

export default function CustomOrderPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Custom Orders"
        title="Let's create something beautiful"
        description="Share your measurements, inspiration, and vision for a handmade crochet piece."
      />

      <Card className="mx-auto mt-10 max-w-3xl">
        <div className="grid gap-4">
          <Input label="Full name" name="fullName" />

          <Input label="Email" name="email" type="email" />

          <Input label="What would you like made?" name="itemType" />

          <Input label="Bust measurement" name="bust" />

          <Input label="Waist measurement" name="waist" />

          <Input label="Hip measurement" name="hip" />

          <Textarea
            label="Tell us about your vision"
            name="description"
            placeholder="Colors, fit, deadline, inspiration, or anything important."
          />

          <Button>Submit Custom Request</Button>
        </div>
      </Card>
    </PageContainer>
  );
}
