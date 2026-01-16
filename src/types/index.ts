export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface Claim {
    id: string;
    type: 'Reimbursement' | 'Clinic';
    date: string;
    claimant: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
}

export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
}

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Dashboard: undefined;
    SubmitClaim: undefined;
    ClaimCreated: { claimId: string };
    ClaimsHistoryFilter: undefined;
    ClaimsHistoryList: { claimant: string };
};
