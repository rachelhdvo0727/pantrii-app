import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { findProducerProducts } from '../../utils/api';

const initialState = {
    producerProducts: [],
    status: null,
    loading: false,
};

export const getProductsForProducer = createAsyncThunk(
    'producer/producerProducts',
    (config) => {
        return axios(findProducerProducts(config))
            .then((response) => {
                const data = response?.data?.documents;
                return data;
            })
            .catch((error) => console.error(error));
    },
);

export const producerProductsSlice = createSlice({
    name: 'producerProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsForProducer.pending, (state, action) => {
                state.status = 'Pending';
                state.loading = true;
            })
            .addCase(getProductsForProducer.fulfilled, (state, action) => {
                state.status = 'Fulfilled';
                state.loading = false;
                state.producerProducts = action.payload;
            })
            .addCase(getProductsForProducer.rejected, (state, action) => {
                state.status = 'Rejected';
                state.loading = false;
            });
    },
});
