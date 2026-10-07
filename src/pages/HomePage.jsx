import Navbar from "../components/Navbar";
import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/articles"
  );

  const articles = Array.isArray(data)
    ? data
    : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Artículos publicados
        </h1>

        {isLoading ? (
          <p className="text-center text-lg font-semibold">
            Cargando artículos...
          </p>
        ) : error ? (
          <p className="text-center font-semibold text-red-600">
            {error}
          </p>
        ) : articles.length === 0 ? (
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

                <p className="mb-3 text-sm text-gray-500">
                  Autor:{" "}
                  {article.author?.username ||
                    "Sin autor"}
                </p>

                {article.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded bg-gray-200 px-2 py-1 text-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;