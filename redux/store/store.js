import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducer/CartReducer';
import favouriteReducer from '../reducer/FavouriteReducer';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourite: favouriteReducer,
    },
});

export default store;
