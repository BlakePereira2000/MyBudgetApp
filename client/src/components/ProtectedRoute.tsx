import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./Auth";

interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
  return isLoggedIn() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" replace state={{ from: path }} />
  );
};

export default ProtectedRoute;
