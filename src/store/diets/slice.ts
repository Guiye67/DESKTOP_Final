import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Diet } from '../../models/Diet';

const DEFAULT_STATE: Diet[] = [];

export const dietsSlice = createSlice({
	name: 'diets',
	initialState: DEFAULT_STATE,
	reducers: {
		setDiets: (_state, action: PayloadAction<Diet[]>) => {
			return action.payload;
		},
		deleteDiet: (state, action: PayloadAction<string>) => {
			return state.filter((diet) => diet.id != action.payload);
		},
	},
});

export default dietsSlice.reducer;

export const { setDiets, deleteDiet } = dietsSlice.actions;
