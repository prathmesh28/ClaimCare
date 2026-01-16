import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { AuthApi } from '../api/auth.api';
import { StorageService } from '../services/storage.service';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuth = useCallback(async (): Promise<boolean> => {
        try {
            const tokens = StorageService.getTokens();
            const savedUser = StorageService.getUser();

            if (tokens && savedUser) {
                setUser(savedUser);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await AuthApi.login(username, password);

            const userData: User = {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                role: 'Employee',
            };

            StorageService.saveTokens({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            StorageService.saveUser(userData);
            setUser(userData);
        } catch (error) {
            throw new Error('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        StorageService.clearAll();
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            checkAuth,
        }),
        [user, isLoading, login, logout, checkAuth]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
