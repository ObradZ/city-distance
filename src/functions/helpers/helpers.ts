export const getIsRequiredText = (field: string) => {
    return field + " is required.";
};

export const getRandomId = () => {
    return Math.random().toString(16).slice(2);
};
