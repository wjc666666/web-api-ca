import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * ProtectedRoute component to guard private routes.
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);

    if (auth.loading) return <p>Loading...</p>;

    return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;