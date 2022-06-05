import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mongoDbConfig } from '../../utils/api';

const initialState = {
    products: [],
    status: null,
    loading: false,
};

export const getProducts = createAsyncThunk(
    'category/getCategoryProducts',
    () => {
        return axios(mongoDbConfig('products'))
            .then((response) => {
                const products = response?.data?.documents;
                console.log('slice', products);
                return products;
            })
            .catch((error) => console.error(error));
    },
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
