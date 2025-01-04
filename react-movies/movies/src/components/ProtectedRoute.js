import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * ProtectedRoute 组件，用于保护私有路由
 * @param {Object} props - 组件属性
 * @returns {JSX.Element}
 */
const ProtectedRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    console.log('ProtectedRoute - Auth Status:', auth.isAuthenticated, 'Loading:', auth.loading);

    if (auth.loading) return <p>Loading...</p>;

    return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;