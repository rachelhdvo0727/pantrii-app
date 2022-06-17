import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { findProductById, createProduct } from '../../utils/api';

const initialState = {
    product: undefined,
    status: null,
    loading: false,
};

export const createProductForProducer = createAsyncThunk(
    'product/createProductForProducer',
    (data) => {
        return axios(createProduct(data))
            .then((response) => {
                const product = response?.data?.document;
                // console.log('slice', response);
                return product;
            })
            .catch((error) => console.error(error));
    },
);

export const findProduct = createAsyncThunk('product/findProduct', (data) => {
    return axios(findProductById(data))
        .then((response) => {
            const product = response?.data?.document;
            // console.log('slice', product);
            return product;
        })
        .catch((error) => console.error(error));
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProductForProducer.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(createProductForProducer.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(createProductForProducer.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            })
            .addCase(findProduct.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(findProduct.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(findProduct.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
