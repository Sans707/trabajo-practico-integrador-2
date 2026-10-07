import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  const isLogged =
    localStorage.getItem("isLogged") ===
    "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                isLogged
                  ? "/"
                  : "/login"
              }
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;