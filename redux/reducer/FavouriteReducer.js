import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addToFavourite(state, { payload }) {
            console.log(payload);
            const { _id } = payload;
            const find = state.find((item) => item._id === _id);

            if (find) {
                return state.map((item) =>
                    item._id === _id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item,
                );
            } else {
                state.push({
                    ...payload,
                    quantity: 1,
                });
            }
        },
        removeFavourite: (state, action) => {
            const itemId = action.payload;
            return state.filter((item) => item._id !== itemId);
        },
        clearFavourite(state) {
            return [];
        },
    },
});

export const { addToFavourite, removeFavourite, clearFavourite } =
    cartSlice.actions;
const favouriteReducer = cartSlice.reducer;

export default favouriteReducer;
