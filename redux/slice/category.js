import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCategoryProducts, mongoDbConfig } from '../../utils/api';

const initialState = {
    categoryProducts: [],
    status: null,
    loading: false,
};

export const getCategoryProducts = createAsyncThunk(
    'category/getCategoryProducts',
    (categoryId) => {
        return axios(fetchCategoryProducts(categoryId))
            .then((response) => {
                const categoryProducts = response?.data?.documents;
                console.log('slice', categoryProducts);
                return categoryProducts;
            })
            .catch((error) => console.error(error));
    },
);

export const categoryProductsSlice = createSlice({
    name: 'categoryProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryProducts.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getCategoryProducts.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.categoryProducts = action.payload;
            })
            .addCase(getCategoryProducts.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
