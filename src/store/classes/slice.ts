import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Class } from '../../models/Class';

const DEFAULT_STATE: Class[] = [];

export const classesSlice = createSlice({
	name: 'classes',
	initialState: DEFAULT_STATE,
	reducers: {
		setClasses: (_state, action: PayloadAction<Class[]>) => {
			return action.payload;
		},
	},
});

export default classesSlice.reducer;

export const { setClasses } = classesSlice.actions;
