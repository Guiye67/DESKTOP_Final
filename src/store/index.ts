import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/slice';
import clientsReducer from './clients/slice';
import { persistanceMiddleware } from '../middleware/persistance/persistanceMiddleware';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		clients: clientsReducer,
	},
	middleware: [persistanceMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
