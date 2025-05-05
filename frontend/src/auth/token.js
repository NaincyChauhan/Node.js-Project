export const storeToken = (token) => {
    const now = new Date();
    const item = {
        token: token,
        expiry: now.getTime() + 60 * 60 * 1000 // 1 hour in milliseconds
    };
    localStorage.setItem('authToken', JSON.stringify(item));
}

export const getToken = () => {
    const itemStr = localStorage.getItem('authToken');
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        // Token expired
        localStorage.removeItem('authToken');
        return null;
    }

    return item.token;
};