export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm transition-opacity">
      {/* Caja blanca principal */}
      <div className="w-full max-w-md flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>

          {/* Botón de cerrar (X) */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Contenido (El formulario que le inyectemos) */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
