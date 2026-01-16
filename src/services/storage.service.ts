import { storage } from '../config/mmkv.config';
import { STORAGE_KEYS } from '../constants';
import type { User, AuthTokens, Claim } from '../types';

export class StorageService {
    static saveTokens(tokens: AuthTokens): void {
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    }

    static getTokens(): AuthTokens | null {
        const accessToken = storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);

        if (!accessToken || !refreshToken) return null;

        return { accessToken, refreshToken };
    }

    static saveUser(user: User): void {
        storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    static getUser(): User | null {
        const userData = storage.getString(STORAGE_KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    }

    static saveClaims(claims: Claim[]): void {
        storage.set(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    }

    static getClaims(): Claim[] {
        const claimsData = storage.getString(STORAGE_KEYS.CLAIMS);
        return claimsData ? JSON.parse(claimsData) : [];
    }

    static clearAll(): void {
        storage.clearAll();
    }

    static removeTokens(): void {
        storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
        storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
    }
}