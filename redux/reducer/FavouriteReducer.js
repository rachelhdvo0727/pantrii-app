import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favouriteSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addToFavourite(state, { payload }) {
            // console.log(payload);
            const { _id } = payload;
            const find = state.find((item) => item._id === _id);

            if (find) {
                return state.map((item) =>
                    item._id === _id
                        ? {
                              ...item,
                              favourited: false,
                          }
                        : item,
                );
            } else {
                state.push({
                    ...payload,
                    favourited: true,
                });
            }

            // state.push({
            //     ...payload,
            //     favourited: true,
            // });
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
    favouriteSlice.actions;
const favouriteReducer = favouriteSlice.reducer;

export default favouriteReducer;
