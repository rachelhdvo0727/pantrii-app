import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { mongoDbConfig, findCategoryById } from '../../utils/api';

const initialState = {
    categories: [],
    category: undefined,
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

export const findCategory = createAsyncThunk('category/findCategory', (id) => {
    return axios(findCategoryById(id))
        .then((response) => {
            const category = response?.data?.document;
            return category;
        })
        .catch((error) => console.error(error));
});

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
            })
            .addCase(findCategory.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(findCategory.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(findCategory.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
