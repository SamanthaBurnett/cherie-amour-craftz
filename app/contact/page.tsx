import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { Input } from "@/components/ui/Input";

import { PageContainer } from "@/components/ui/PageContainer";

import { SectionHeader } from "@/components/ui/SectionHeader";

import { Textarea } from "@/components/ui/Textarea";

export default function ContactPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Contact"
        title="Have a question?"
        description="Reach out about sizing, orders, custom pieces, or anything else."
      />

      <Card className="mx-auto mt-10 max-w-2xl">
        <div className="grid gap-4">
          <Input label="Name" name="name" />

          <Input label="Email" name="email" type="email" />

          <Textarea label="Message" name="message" />

          <Button>Send Message</Button>
        </div>
      </Card>
    </PageContainer>
  );
}
