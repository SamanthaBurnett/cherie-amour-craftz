import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },

  { href: "/admin/products", label: "Products" },

  { href: "/admin/orders", label: "Orders" },

  { href: "/admin/inventory", label: "Inventory" },

  { href: "/admin/custom-requests", label: "Custom Requests" },

  { href: "/admin/customers", label: "Customers" },

  { href: "/admin/profile", label: "Profile" },
];

export function AdminNav() {
  return (
    <aside className="rounded-card border border-border bg-white p-5 md:w-64">
      <h2 className="text-lg font-semibold text-text">Admin</h2>

      <nav className="mt-6 grid gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-button px-4 py-3 text-sm font-medium text-text-muted transition hover:bg-surface hover:text-text"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
