import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Home from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRoute, PublicRoute } from './ProtectedRoute';
import RolesPage from '../pages/admin/roles/RolesPage';

function Router() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                element={
                    <PublicRoute isAuthenticated={user.isAuthenticated} />
                }>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Route>

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute isAuthenticated={user.isAuthenticated} />
                }>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/roles' element={<RolesPage />} />
            </Route>

        </Routes>
    );
}

export default Router;
