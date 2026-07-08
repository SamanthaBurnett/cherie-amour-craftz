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
        <form className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold">Customer Information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="First Name" name="firstName" />

              <Input label="Last Name" name="lastName" />
            </div>

            <div className="mt-4 grid gap-4">
              <Input label="Email Address" name="email" type="email" />

              <Input label="Phone Number" name="phone" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Order Details</h2>

            <div className="mt-6 grid gap-4">
              <Input
                label="What would you like made?"
                name="itemType"
                placeholder="Example: crochet top, bag, dress, cover-up"
              />

              <Textarea
                label="Describe your vision"
                name="description"
                placeholder="Tell us about colors, fit, style, occasion, inspiration, or anything important."
              />

              <Input label="Requested Deadline" name="deadline" type="date" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Inspiration Images</h2>

            <p className="mt-2 text-sm text-text-muted">
              Upload any reference photos, sketches, colors, or styles that help
              explain your vision. Image storage will be connected in a future
              milestone.
            </p>

            <label className="mt-6 block rounded-card border border-dashed border-border bg-surface p-6 text-center">
              <span className="text-sm font-medium text-text">
                Choose reference images
              </span>

              <input
                name="referenceImages"
                type="file"
                accept="image/*"
                multiple
                className="mt-4 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text"
              />
            </label>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Measurements</h2>

            <p className="mt-2 text-sm text-text-muted">
              Add any measurements that apply to your custom piece. Leave
              anything blank if it does not apply.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input label="Bust" name="bust" />

              <Input label="Waist" name="waist" />

              <Input label="Hips" name="hips" />

              <Input label="Length" name="length" />

              <Input label="Shoulder" name="shoulder" />

              <Input label="Inseam" name="inseam" />
            </div>

            <div className="mt-4">
              <Textarea
                label="Measurement Notes"
                name="measurementNotes"
                placeholder="Add underbust, strap length, preferred fit, or any other sizing details."
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Additional Notes</h2>

            <Textarea
              label="Anything else?"
              name="notes"
              placeholder="Preferred colors, yarn preferences, event date, or special instructions."
            />
          </section>

          <Button type="submit" className="w-full">
            Continue Custom Request
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
