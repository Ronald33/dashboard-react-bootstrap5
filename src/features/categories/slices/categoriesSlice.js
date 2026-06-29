import { createSlice } from '@reduxjs/toolkit'
import CategoryService from '../services/categoryService'
import Helpers from '@/utils/Helpers'

const SLICE_NAME = 'categories'

/* =======================
   Thunks
======================= */
export const fetchCategories = Helpers.api.createAppThunk(SLICE_NAME + '/fetchAll', (arg) => CategoryService.fetch(arg));
export const fetchCategoryById = Helpers.api.createAppThunk(SLICE_NAME + '/fetchById', ({ id, params, config }) => CategoryService.getById({ id, params, config }));
export const createCategory = Helpers.api.createAppThunk(SLICE_NAME + '/create', ({ data, config }) => CategoryService.create({ data, config }));
export const updateCategory = Helpers.api.createAppThunk(SLICE_NAME + '/update', ({ id, data, config }) => CategoryService.update({ id, data, config }));
export const deleteCategory = Helpers.api.createAppThunk(SLICE_NAME + '/delete', ({ id, config }) => CategoryService.delete({ id, config }));
export const patchCategory = Helpers.api.createAppThunk(SLICE_NAME + '/patch', ({ id, data, config }) => CategoryService.patch({ id, data, config }));

/* =======================
   Slice
======================= */
const categoriesSlice = createSlice(
{
    name: SLICE_NAME,
    initialState: 
    {
        list: [],
        item: null,
        loading: {},
    },
    reducers: 
    {
        // Limpia el item. Llámalo al abrir el formulario en modo "crear"
        // para asegurarte de que no queden datos de una edición anterior.
        unsetCategoryItem(state) { state.item = null; }
    },
    extraReducers: (builder) => 
    {
        builder.addMatcher(
            (action) => action.type.startsWith(SLICE_NAME + '/'),
            (state, action) => 
            {
                const parts = action.type.split('/');
                const methodName = parts[1];
                const status = parts[2];

                state.loading[methodName] = (status === 'pending');

                if(status === 'fulfilled') 
                {
                    if(methodName === 'fetchAll') { state.list = action.payload?.data ?? action.payload; }
                    if(methodName === 'fetchById') { state.item = action.payload?.data ?? action.payload; }
                }
            }
        )
    }
});

export const { unsetCategoryItem } = categoriesSlice.actions;
export default categoriesSlice.reducer;