export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar...",
  className = "",
}) => {
  return (
    <div
      className={`flex w-full items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 transition-colors ${className}`}
    >
      {/* Icono de Lupa */}
      <span className="mr-3 text-slate-400">🔍</span>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500 transition-colors hover:bg-slate-300 cursor-pointer"
          title="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
};
