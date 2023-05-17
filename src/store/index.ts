import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/slice';
import clientsReducer from './clients/slice';
import classesReducer from './classes/slice';
import postsReducer from './posts/slice';
import suggestionsReducer from './suggestions/slice';
import dietsReducer from './diets/slice';
import { persistanceMiddleware } from '../middleware/persistance/persistanceMiddleware';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		clients: clientsReducer,
		classes: classesReducer,
		posts: postsReducer,
		suggestions: suggestionsReducer,
		diets: dietsReducer,
	},
	middleware: [persistanceMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
