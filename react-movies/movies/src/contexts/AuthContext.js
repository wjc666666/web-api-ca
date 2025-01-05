import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import { fetchUserFavorites } from '../services/moviesService';

export const AuthContext = createContext();

/**
 * AuthContextProvider 用于管理用户认证状态。
 */
const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getCurrentUser();
          setAuth({
            isAuthenticated: true,
            user: data.data,
            loading: false,
          });
        } catch (error) {
          console.error(error);
          setAuth({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } else {
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    fetchUser();
  }, []);

  const loginUser = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      loading: false,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
