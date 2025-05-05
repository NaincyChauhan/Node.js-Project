import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import Home from '../pages/HomePage';

function Router() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Route>

            {/* Page Not Found */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default Router;
