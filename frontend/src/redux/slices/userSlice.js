import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '../../auth/token';

const initialState = {
    data: {
        name: '',
        email: '',
    },
    isAuthenticated: getToken() ? true : false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { data } = action.payload;
            state.data = data;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.data = {
                name: '',
                email: '',
            };
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;