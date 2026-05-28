import { useState, useEffect } from "react";
import { Modal } from "../shared/Modal";
import { Button } from "../atoms/Button";
import { searchUsersByName } from "../../services/userAPI";

export const AddMemberModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  existingMemberIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!searchTerm.trim() || selectedUser) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchUsersByName(searchTerm);

        const filteredResults = results.filter((user) => {
          const userId = user.userId || user.id;
          return !existingMemberIds.includes(userId);
        });

        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Error buscando usuarios:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedUser, existingMemberIds]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    const finalUserId = selectedUser.userId || selectedUser.id;
    onConfirm(finalUserId);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setSearchTerm("");
    setSearchResults([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Añadir Miembro al Proyecto"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-slate-500">
          Busca al usuario por su nombre. Se le asignará el rol de Miembro
          normal por defecto.
        </p>

        <div className="relative">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Usuario
          </label>

          {selectedUser ? (
            <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-800">
                  {selectedUser.username}
                </span>

                {selectedUser.email && (
                  <span className="text-xs text-blue-600">
                    {selectedUser.email}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClearSelection}
                className="rounded-full p-1 text-blue-400 transition-colors hover:bg-blue-200 hover:text-blue-700 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Escribe para buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {isSearching && (
                <div className="absolute right-3 top-2.5 h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"></div>
              )}
            </div>
          )}

          {searchResults.length > 0 && !selectedUser && (
            <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {searchResults.map((user) => {
                const uniqueId = user.userId || user.id;

                return (
                  <li
                    key={uniqueId}
                    onClick={() => handleSelectUser(user)}
                    className="cursor-pointer px-4 py-2 transition-colors hover:bg-blue-50"
                  >
                    <p className="text-sm font-medium text-slate-800">
                      {user.username}
                    </p>
                    {user.email && (
                      <p className="text-xs text-slate-500">{user.email}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {searchTerm.trim() &&
            searchResults.length === 0 &&
            !isSearching &&
            !selectedUser && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
                <p className="text-sm text-slate-500">
                  No se encontraron usuarios disponibles.
                </p>
              </div>
            )}
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 cursor-pointer"
          >
            Cancelar
          </button>
          <Button type="submit" disabled={loading || !selectedUser}>
            {loading ? "Añadiendo..." : "Añadir Miembro"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
