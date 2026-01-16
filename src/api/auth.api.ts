import { apiClient } from './index';
import { ENDPOINTS } from '../constants';
import type { LoginResponse } from '../types';

export const AuthApi = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const { data } = await apiClient.post<LoginResponse>(ENDPOINTS.LOGIN, {
            username,
            password,
            expiresInMins: 30,
        });
        return data;
    },

    refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
        const { data } = await apiClient.post(ENDPOINTS.REFRESH, {
            refreshToken,
            expiresInMins: 30,
        });
        return data;
    },
};