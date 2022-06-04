import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './slice/categories';
import { userSlice } from './slice/user';
import { rolesSlice } from './slice/roles';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        roles: rolesSlice.reducer,
        categories: categoriesSlice.reducer,
    },
});
