import ProtectedRoute from '@components/ProtectedRoute';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import RecipePage from '@pages/RecipePage';

const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        name: 'register',
        element: <RegisterPage />,
    },
];

const privateRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/recipes/:recipeId',
        element: <RecipePage/>,
        
    },
];

const protectedRoutes = privateRoutes.map((route) => {
    return {
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    };
});

const routes = [...publicRoutes, ...protectedRoutes];

export default routes;
