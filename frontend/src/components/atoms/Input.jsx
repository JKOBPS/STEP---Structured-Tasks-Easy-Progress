export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-slate-300 p-2 text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};
