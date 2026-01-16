import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { StorageService } from '../services/storage.service';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config) => {
        const tokens = StorageService.getTokens();
        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokens = StorageService.getTokens();
                if (tokens?.refreshToken) {
                    const { data } = await axios.post(
                        `${API_BASE_URL}/auth/refresh`,
                        { refreshToken: tokens.refreshToken }
                    );

                    StorageService.saveTokens({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    });

                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                StorageService.clearAll();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);