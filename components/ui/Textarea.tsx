type TextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
};

export function Textarea({
  label,
  name,
  placeholder,
  defaultValue,
}: TextareaProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={5}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition placeholder:text-text-muted focus:border-coral"
      />
    </label>
  );
}
