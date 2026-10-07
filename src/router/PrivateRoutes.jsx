import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isLogged =
    localStorage.getItem("isLogged") === "true";

  return isLogged
    ? children
    : <Navigate to="/login" replace />;
};

export default PrivateRoutes;