import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const userData = localStorage.getItem("devburger:userData");
  const token = userData ? JSON.parse(userData).token : null;

  if (!token) {
    // Se não tiver token, vai para /login
    return <Navigate to="/login" replace />;
  }

  // Se tiver token, renderiza os filhos (a rota protegida)
  return children;
}