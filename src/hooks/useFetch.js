import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error(
              result.message || "Solicitud incorrecta"
            );

          case 401:
            throw new Error(
              "La sesión no existe o ha expirado"
            );

          case 403:
            throw new Error(
              "No tenés permisos para realizar esta acción"
            );

          case 500:
            throw new Error(
              "Error interno del servidor"
            );

          default:
            throw new Error(
              result.message || "Error al obtener los datos"
            );
        }
      }

      setData(result);
    } catch (error) {
      setError(
        error.message === "Failed to fetch"
          ? "No se pudo conectar con el servidor"
          : error.message
      );
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
  };
};