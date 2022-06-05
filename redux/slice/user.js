import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { findUser } from '../../utils/api';
import { objectToString, saveData } from '../../utils/functions';

const initialState = {
    user: undefined,
    status: null,
    loading: false,
};

export const getUser = createAsyncThunk('user/getUser', (data, byId) => {
    return axios(findUser(data, false))
        .then((response) => {
            const data = response?.data?.document;
            saveData('user', objectToString(data));
            return data;
        })
        .catch((error) => console.error(error, response));
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
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
    },
});
