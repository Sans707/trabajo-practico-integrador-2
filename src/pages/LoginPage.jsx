import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Credenciales incorrectas"
        );
      }
  localStorage.setItem("isLogged", "true");

  navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
return (
  <main className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Iniciar sesión
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-1 block font-medium"
          >
            Email
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block font-medium"
          >
            Contraseña
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-600 p-2 font-semibold text-white disabled:opacity-50"
        >
          {isLoading
            ? "Iniciando sesión..."
            : "Iniciar sesión"}
        </button>
      </form>

      {/* ACÁ VA */}
      <p className="mt-4 text-center text-sm">
        ¿No tenés una cuenta?{" "}
        <Link
          to="/register"
          className="font-semibold text-blue-600"
        >
          Registrate
        </Link>
      </p>
    </div>
  </main>
);
};

export default LoginPage;