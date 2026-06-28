import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/custom-order", label: "Custom Orders" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-bold text-text">Cherie Amour Craftz</h2>

          <p className="mt-3 max-w-md text-sm text-text-muted">
            Custom crochet pieces made with love, made to fit you.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text">Explore</h3>

          <div className="mt-4 grid gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted transition hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-text">Connect</h3>

          <div className="mt-4 grid gap-2 text-sm text-text-muted">
            <p>Email placeholder</p>

            <p>Instagram placeholder</p>

            <p>TikTok placeholder</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="mx-auto max-w-6xl text-sm text-text-muted">
          © {new Date().getFullYear()} Cherie Amour Craftz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
