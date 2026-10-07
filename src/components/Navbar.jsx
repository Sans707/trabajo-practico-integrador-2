const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 px-8 py-4 text-white">
      <h2 className="text-xl font-bold">
        Blog Personal
      </h2>

      <button
        className="rounded bg-red-500 px-4 py-2 font-semibold hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;