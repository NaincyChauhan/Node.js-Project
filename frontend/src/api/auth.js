const API_URL = 'http://127.0.0.1:8000';

// Register new user
export const register = async ( userData) => {
    const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return res.json();
}

export const login = async (credentials) => {
    const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    return res.json();
}