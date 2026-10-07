import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useForm } from "../hooks/useForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    formState,
    handleInputChange,
    handleReset,
  } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const {
    username,
    email,
    password,
  } = formState;

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (
          response.status === 400 &&
          Array.isArray(data.errors)
        ) {
          const messages = data.errors
            .map((error) => error.msg)
            .join(" - ");

          throw new Error(messages);
        }

        if (response.status === 400) {
          throw new Error(
            data.message ||
              "Datos inválidos"
          );
        }

        if (response.status === 403) {
          throw new Error(
            "No tenés permisos"
          );
        }

        if (response.status === 500) {
          throw new Error(
            "Error interno del servidor"
          );
        }

        throw new Error(
          data.message ||
            "Error al registrar usuario"
        );
      }

      handleReset();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor"
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Crear cuenta
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-1 block font-medium"
            >
              Nombre de usuario
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>

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

            <p className="mt-1 text-sm text-gray-500">
              Mínimo 8 caracteres, una
              mayúscula, una minúscula y un
              número.
            </p>
          </div>

          {error && (
            <p className="text-center text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading
              ? "Registrando..."
              : "Registrarse"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          ¿Ya tenés una cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;