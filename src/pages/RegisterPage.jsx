import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

const RegisterPage = () => {
  const {
    formState,
    handleInputChange,
    handleReset,
  } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formState;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        if (Array.isArray(data.errors)) {
          const messages = data.errors
            .map((error) => error.msg)
            .join(" - ");

          throw new Error(messages);
        }

        throw new Error(
          data.message || "Error al registrar el usuario"
        );
      }

      handleReset();

      navigate("/login");
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
        Crear cuenta
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* username */}

        {/* email */}

        {/* password */}

        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="text-center text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-blue-600 p-2 font-semibold text-white disabled:opacity-50"
        >
          {isLoading
            ? "Registrando..."
            : "Registrarse"}
        </button>
      </form>

      {/* ACÁ VA */}
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