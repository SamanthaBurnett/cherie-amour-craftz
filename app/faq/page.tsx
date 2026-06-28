import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqs = [
  {
    question: "Do you accept custom orders?",

    answer:
      "Yes. Custom orders will be submitted through the custom order form.",
  },

  {
    question: "Do I need measurements?",

    answer: "For wearable pieces, measurements help create a better fit.",
  },

  {
    question: "How long do custom pieces take?",

    answer: "Timeline details will be confirmed after the request is reviewed.",
  },
];

export default function FAQPage() {
  return (
    <PageContainer>
      <SectionHeader
        eyebrow="FAQ"
        title="Common questions"
        description="Answers about custom orders, sizing, and handmade pieces."
      />

      <div className="mx-auto mt-10 grid max-w-3xl gap-4">
        {faqs.map((faq) => (
          <Card key={faq.question}>
            <h2 className="text-lg font-semibold">{faq.question}</h2>

            <p className="mt-2 text-text-muted">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
