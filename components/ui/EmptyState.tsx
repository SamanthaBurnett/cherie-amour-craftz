import Link from "next/link";
import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-border bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <span className="text-xl">♡</span>
      </div>

      <h3 className="text-xl font-semibold text-text">{title}</h3>

      <p className="mx-auto mt-2 max-w-md text-text-muted">{description}</p>

      {actionLabel &&
        (actionHref ? (
          <Link href={actionHref}>
            <Button className="mt-6">{actionLabel}</Button>
          </Link>
        ) : (
          <Button className="mt-6">{actionLabel}</Button>
        ))}
    </div>
  );
}
