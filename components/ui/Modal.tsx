import { Button } from "@/components/ui/Button";

type ModalProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function Modal({ title, description, children }: ModalProps) {
  return (
    <div className="rounded-card border border-border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-text">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-text-muted">{description}</p>
        )}
      </div>

      <div>{children}</div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost">Cancel</Button>

        <Button>Save</Button>
      </div>
    </div>
  );
}
