import { configureStore } from '@reduxjs/toolkit';
import { shazamCoreApi } from './utils/shazamCore';
import playerReducer from './slices/playerSlice';


export const store = configureStore({
    reducer: {
        [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
        player: playerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware)
});