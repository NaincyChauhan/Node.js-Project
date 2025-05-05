import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"}  replace />
}

export const PublicRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Navigate to={"/dashboard"}  replace /> : <Outlet />
}