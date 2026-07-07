"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { AuthButtons } from "./AuthButtons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/custom-order", label: "Custom Orders" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/cac-logo.png"
            alt="Cherie Amour Craftz"
            width={52}
            height={52}
            className="rounded-full"
            priority
          />

          <span className="font-serif text-lg font-semibold">
            Cherie Amour Craftz
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                isActive(link.href)
                  ? "text-coral"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            className="rounded-button border border-coral bg-white px-4 py-2 text-sm font-medium text-text transition hover:bg-[#FFF4F2]"
          >
            Bag ({totalItems})
          </Link>

          <AuthButtons />
        </div>

        <button
          type="button"
          className="rounded-button border border-border bg-white px-4 py-2 text-sm font-medium md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle navigation menu"
        >
          Menu
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="mx-auto grid max-w-6xl gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-surface text-coral"
                    : "text-text-muted hover:bg-surface hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl border border-coral bg-white px-4 py-3 text-sm font-medium text-text"
            >
              Bag ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
