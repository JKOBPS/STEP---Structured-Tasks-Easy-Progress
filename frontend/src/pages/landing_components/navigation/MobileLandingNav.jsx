// src/components/navigation/MobileLandingNav.jsx

export const MobileLandingNav = ({ onAction, isVisible }) => {
  return (
    <nav
      className={`fixed bottom-0 left-0 z-50 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden 
      transition-transform duration-300 ease-in-out 
      ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto flex max-w-md justify-center">
        <button
          onClick={onAction}
          className="w-full rounded bg-blue-600 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          Acceder
        </button>
      </div>
    </nav>
  );
};
