export const storeToken = (token) => {
    const now = new Date();
    const item = {
        token: token,
        expiry: now.getTime() + 60 * 60 * 1000 // 1 hour in milliseconds
    };
    localStorage.setItem('authToken', JSON.stringify(item));
}