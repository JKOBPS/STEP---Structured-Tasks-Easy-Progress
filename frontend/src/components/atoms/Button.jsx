export const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-2 rounded-md bg-blue-600 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
