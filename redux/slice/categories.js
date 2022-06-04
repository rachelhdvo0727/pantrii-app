import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mongoDbConfig } from '../../utils/api';

const initialState = {
    user: undefined,
};

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    () => {
        return axios(mongoDbConfig('categories'))
            .then((response) =>
                console.log('categoriesSlice', response?.data?.document),
            )
            .catch((error) => console.error(error));
    },
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
