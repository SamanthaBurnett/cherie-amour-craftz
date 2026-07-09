type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
};

export function Input({
  label,
  name,
  placeholder,
  type = "text",
  defaultValue,
}: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-text outline-none transition placeholder:text-text-muted focus:border-coral"
      />
    </label>
  );
}
