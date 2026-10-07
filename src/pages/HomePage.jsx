import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles"
  );

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold">
          Cargando artículos...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 font-semibold">
          {error}
        </p>
      </main>
    );
  }

  const articles = Array.isArray(data)
    ? data
    : data?.articles || [];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Artículos publicados
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay artículos publicados.
        </p>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-lg bg-white p-6 shadow"
            >
              <h2 className="mb-2 text-2xl font-bold">
                {article.title}
              </h2>

              <p className="mb-4 text-gray-700">
                {article.excerpt || "Sin resumen"}
              </p>

              <p className="text-sm text-gray-500">
                Autor:{" "}
                {article.author?.alias ||
                  article.author?.username ||
                  article.User?.username ||
                  "Sin autor"}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;