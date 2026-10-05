import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axios-instance';
import { getToken, setToken, removeToken, isAuthenticated as checkAuth } from '@/lib/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.get('/users/profile');
      const profileData = response.data?.data || response.data;
      setUser(profileData);
    } catch (err) {
      console.warn("Could not load user profile:", err);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
    const handler = () => { setUser(null); };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, [loadProfile]);

  const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const raw = response.data?.data || response.data;
    const accessToken = raw?.accessToken || raw;

    if (!accessToken || typeof accessToken !== 'string' || accessToken === 'undefined') {
      throw new Error("Invalid access token received from server");
    }

    setToken(accessToken);

    try {
      const profileResponse = await axiosInstance.get('/users/profile');
      const profileData = profileResponse.data?.data || profileResponse.data;
      setUser(profileData);
      return profileData;
    } catch (err) {
      console.warn("Login succeeded but profile fetch failed, using fallback:", err);
      const fallbackUser = { email, name: email.split('@')[0] };
      setUser(fallbackUser);
      return fallbackUser;
    }
  };

  const signup = async (name, email, password) => {
    await axiosInstance.post('/auth/signup', { name, email, password });
    return login(email, password);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      refreshProfile: loadProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
