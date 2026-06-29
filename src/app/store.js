import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "@/features/categories/slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});