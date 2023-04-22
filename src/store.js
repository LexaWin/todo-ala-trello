import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ticketsReducer from './slices/ticketsSlice';
export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(thunk),
})