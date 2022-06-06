import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './slice/categories';
import { userSlice } from './slice/user';
import { rolesSlice } from './slice/roles';
import { productSlice } from './slice/product';
import cartReducer from './reducer/CartReducer';
import { producerProductsSlice } from './slice/producerProducts';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        roles: rolesSlice.reducer,
        categories: categoriesSlice.reducer,
        cart: cartReducer,
        product: productSlice.reducer,
        producerProducts: producerProductsSlice.reducer,
    },
});
