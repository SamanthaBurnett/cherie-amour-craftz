"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  createdAt: string;
  orders: { id: string }[];
  customRequests: { id: string }[];
};

type CustomerSearchProps = {
  customers: Customer[];
};

export function CustomerSearch({ customers }: CustomerSearchProps) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchText =
        `${customer.firstName} ${customer.lastName} ${customer.email}`.toLowerCase();

      return searchText.includes(search.toLowerCase());
    });
  }, [customers, search]);

  return (
    <>
      <div className="mt-10 rounded-card border border-border bg-white p-4">
        <label className="block">
          <span className="text-sm font-medium text-text">
            Search Customers
          </span>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
            className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition placeholder:text-text-muted focus:border-coral"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">
                  {customer.firstName} {customer.lastName}
                </p>

                <p className="mt-1 text-sm text-text-muted">{customer.email}</p>

                {customer.phone && (
                  <p className="text-sm text-text-muted">{customer.phone}</p>
                )}

                <p className="mt-3 text-xs text-text-muted">
                  Customer since{" "}
                  {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right text-sm text-text-muted">
                <p>{customer.orders.length} orders</p>

                <p>{customer.customRequests.length} custom requests</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <p className="mt-8 text-center text-text-muted">
          No customers matched your search.
        </p>
      )}
    </>
  );
}
