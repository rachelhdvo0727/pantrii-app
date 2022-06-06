import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mongoDbConfig } from '../../utils/api';

const initialState = {
    categories: [],
    status: null,
    loading: false,
};

const allProducts = {
    _id: '0',
    name: 'allProducts',
    imageSrc: 'all-products.png',
};

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    (withEmptyObject) => {
        return axios(mongoDbConfig('categories'))
            .then((response) => {
                const categories = response?.data?.documents;
                if (withEmptyObject) {
                    if (categories?.length > 0)
                        categories
                            ?.sort((a, b) => a.name.localeCompare(b.name))
                            .unshift(allProducts);
                } else {
                    categories?.sort((a, b) => a.name.localeCompare(b.name));
                }

                return categories;
            })
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
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
