"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/Textarea";
import { MeasurementUnitSelector } from "@/components/MeasurementUnitSelector";
import { FormEvent, useState } from "react";

export default function CustomOrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      firstName: String(formData.get("firstName") ?? ""),

      lastName: String(formData.get("lastName") ?? ""),

      email: String(formData.get("email") ?? ""),

      phone: String(formData.get("phone") ?? ""),

      itemType: String(formData.get("itemType") ?? ""),

      description: String(formData.get("description") ?? ""),

      deadline: String(formData.get("deadline") ?? "") || null,

      referenceImageUrl: null,

      measurements: {
        bust: formData.get("bust") ? Number(formData.get("bust")) : null,

        waist: formData.get("waist") ? Number(formData.get("waist")) : null,

        hips: formData.get("hips") ? Number(formData.get("hips")) : null,

        length: formData.get("length") ? Number(formData.get("length")) : null,

        shoulder: formData.get("shoulder")
          ? Number(formData.get("shoulder"))
          : null,

        inseam: formData.get("inseam") ? Number(formData.get("inseam")) : null,

        notes: [
          `Unit: ${formData.get("measurementUnit") ?? "in"}`,

          String(formData.get("measurementNotes") ?? ""),
        ]

          .filter(Boolean)

          .join("\n"),
      },
    };

    try {
      const response = await fetch("/api/custom-requests", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Custom request could not be submitted.");
      }

      setSuccessMessage("Your custom request was submitted successfully.");

      form.reset();
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong while submitting your request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageContainer>
      <SectionHeader
        eyebrow="Custom Orders"
        title="Let's create something beautiful"
        description="Share your measurements, inspiration, and vision for a handmade crochet piece."
      />

      <Card className="mx-auto mt-10 max-w-3xl">
        <form onSubmit={handleSubmit} className="grid gap-8">
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

            <p className="mt-2 text-sm text-text-muted">
              Choose one unit for all measurements so sizing stays consistent.
            </p>

            <div className="mt-6">
              <MeasurementUnitSelector />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input
                label="Bust"
                name="bust"
                type="number"
                placeholder="Example: 34"
              />

              <Input
                label="Waist"
                name="waist"
                type="number"
                placeholder="Example: 28"
              />

              <Input
                label="Hips"
                name="hips"
                type="number"
                placeholder="Example: 38"
              />

              <Input
                label="Length"
                name="length"
                type="number"
                placeholder="Example: 16"
              />

              <Input
                label="Shoulder"
                name="shoulder"
                type="number"
                placeholder="Example: 15"
              />

              <Input
                label="Inseam"
                name="inseam"
                type="number"
                placeholder="Example: 30"
              />
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

          {successMessage && (
            <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-error">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Request..." : "Submit Custom Request"}
          </Button>
        </form>
      </Card>
    </PageContainer>
  );
}
