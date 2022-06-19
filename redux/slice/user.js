import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    findUser,
    updateUserInformation,
    createUserAccount,
} from '../../utils/api';
import { objectToString, saveData } from '../../utils/functions';

const initialState = {
    user: undefined,
    status: null,
    loading: false,
};

export const getUser = createAsyncThunk('user/getUser', (data) => {
    return axios(findUser(data.data, data.byId))
        .then((response) => {
            const data = response?.data?.document;
            if (!data.byId) saveData('user', objectToString(data));
            return data;
        })
        .catch((error) => console.error(error, response));
});

export const updateUser = createAsyncThunk('user/updateUser', (data) => {
    return axios(updateUserInformation(data?.user, data?.information))
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => console.error(error));
});

export const createUser = createAsyncThunk('user/createUser', (data) => {
    return axios(createUserAccount(data))
        .then((response) => {
            const data = response?.data?.document;
            console.log('slice', data, response?.status);
            return data;
        })
        .catch((error) => console.error(error, response));
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut(state, { payload }) {
            return { user: payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
        builder
            .addCase(updateUser.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.user = action.meta.arg.user;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});

export const { logOut, persistLogIn } = userSlice.actions;
