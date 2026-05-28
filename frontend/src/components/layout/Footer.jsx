export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/JKOBPS" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jacob-parra-silva-66670b164/",
    },
  ];

  return (
    <footer className="bg-slate-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] text-shadow-slate-950 py-3 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
          {/* Nombre y descripción */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold leading-tight text-black mb-2">
              Step App
            </h3>
            <p className="text-sm">Gestión de proyectos y tareas</p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col mt-auto text-center text-xs text-slate-400 ">
            <p>&copy; {currentYear} Step App. Todos los derechos reservados.</p>
          </div>

          {/* Loop Redes socialLinks */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors font-bold leading-tight cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
