// src/components/atoms/BrandLogo.jsx

// COMPONENTE BRAND LOGO, PARA PODER INYECTARLO FÁCIL EN OTRAS SECCIONES DE LA APLICACIÓN, COMO EL HEADER O EL FOOTER.

export const BrandLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Tu logo visual.*/}
      <img
        src="/step-favicon.svg"
        alt="StepApp Logo"
        to="/dashboard"
        className="h-8 w-8 transition-transform hover:scale-105 cursor-pointer"
      />

      {/*nombre de tu aplicación */}
      <span className="text-2xl font-black tracking-tight text-slate-900">
        STEP
      </span>
    </div>
  );
};
