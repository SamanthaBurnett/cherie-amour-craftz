import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-text">
      <section className="mx-auto max-w-5x1 rounded-card border border-border bg-surface p-8">
        <p className="mb-3 text-sm font-medium text-coral">
          Handmade Crochet
        </p>

        <h1 className="text-4x1 font-bold">
          Cherie Amour Craftz
        </h1>

        <p className="mt-4 max-w-xl text-text-muted">
          Custom crochet pieces made with love, made to fit you.
        </p>

        <button className="mt-6 rounded-button bg-coral px-6 py-3 font-medium text-white hover:bg-coral-hover">
          Start a Custom Order
        </button>
      </section>
    </main>
  );
}
