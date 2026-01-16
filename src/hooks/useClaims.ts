import { useState, useCallback, useEffect } from 'react';
import { StorageService } from '../services/storage.service';
import type { Claim } from '../types';

export const useClaims = (claimant?: string) => {
    const [claims, setClaims] = useState<Claim[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadClaims = useCallback(() => {
        setIsLoading(true);
        try {
            const allClaims = StorageService.getClaims();
            if (claimant && claimant !== 'All Claims') {
                setClaims(allClaims.filter((c) => c.claimant === claimant));
            } else {
                setClaims(allClaims);
            }
        } catch (error) {
            console.error('Failed to load claims:', error);
        } finally {
            setIsLoading(false);
        }
    }, [claimant]);

    const addClaim = useCallback((claim: Claim) => {
        const allClaims = StorageService.getClaims();
        StorageService.saveClaims([claim, ...allClaims]);
        loadClaims();
    }, [loadClaims]);


    const getClaimById = useCallback((id: string) => {
        return claims.find((c) => c.id === id);
    }, [claims]);

    useEffect(() => {
        loadClaims();
    }, [loadClaims]);

    return {
        claims,
        isLoading,
        addClaim,
        getClaimById,
        reload: loadClaims,
    };
};
