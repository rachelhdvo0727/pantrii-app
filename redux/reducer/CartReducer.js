import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, { payload }) {
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
        increment(state, { payload }) {
            return state.map((item) =>
                item._id === payload
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item,
            );
        },
        decrement(state, { payload }) {
            return state.map((item) =>
                item._id === payload
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item,
            );
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            return state.filter((item) => item._id !== itemId);
        },
        clear(state) {
            return [];
        },
    },
});

export const { addToCart, increment, decrement, removeItem, clear } =
    cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
