type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-medium text-coral">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold text-text md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-text-muted">{description}</p>
      )}
    </div>
  );
}
