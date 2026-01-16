export const validateAmount = (amount: string): boolean => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount > 0;
};

export const validateDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
};
