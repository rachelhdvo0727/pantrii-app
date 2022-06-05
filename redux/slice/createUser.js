import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createUserAccount } from '../../utils/api';
import { objectToString, saveData } from '../../utils/functions';

const initialState = {
    user: undefined,
    status: null,
    loading: false,
};

export const createUser = createAsyncThunk('user/createUser', (data) => {
    return axios(createUserAccount(data))
        .then((response) => {
            const data = response?.data?.document;
            return data;
        })
        .catch((error) => console.error(error, response));
});

export const createUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
