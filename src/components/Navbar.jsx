import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "No se pudo cerrar la sesión"
        );
      }

      localStorage.removeItem("isLogged");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-4 text-white">
      <Link
        to="/"
        className="text-xl font-bold"
      >
        Blog Personal
      </Link>

      <div className="flex items-center gap-4">
        {error && (
          <span className="text-sm text-red-100">
            {error}
          </span>
        )}

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="rounded bg-red-500 px-4 py-2 font-semibold hover:bg-red-600 disabled:opacity-50"
        >
          {isLoading
            ? "Cerrando..."
            : "Cerrar sesión"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;