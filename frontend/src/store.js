import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlices';
import {apiSlice} from './slices/apiSlice';
import adminReducer from './slices/adminSlice';

const store = configureStore({
    reducer:{
        auth:authReducer, 
        [apiSlice.reducerPath]:apiSlice.reducer,
        admin:adminReducer

    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
})
export default store;