import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mongoDbConfig } from '../../utils/api';
import { objectToString, saveData } from '../../utils/functions';

const initialState = {
    roles: [],
    status: null,
    loading: false,
};

export const getRoles = createAsyncThunk('roles/getRoles', () => {
    return axios(mongoDbConfig('roles'))
        .then((response) => {
            const roles = response?.data?.documents;
            // console.log('rolesSlice', roles);
            return roles;
        })
        .catch((error) => console.error(error));
});

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoles.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getRoles.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(getRoles.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
