import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isLogged =
    localStorage.getItem("isLogged") === "true";

  return !isLogged
    ? children
    : <Navigate to="/" replace />;
};

export default PublicRoutes;