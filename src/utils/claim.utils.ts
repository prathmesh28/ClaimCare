export const generateClaimId = (): string => {
    return `RC${Math.floor(Math.random() * 9000) + 1000}`;
};
