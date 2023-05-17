import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Suggestion } from '../../models/Suggestion';

const DEFAULT_STATE: Suggestion[] = [];

export const suggestionsSlice = createSlice({
	name: 'suggestions',
	initialState: DEFAULT_STATE,
	reducers: {
		setSuggestions: (_state, action: PayloadAction<Suggestion[]>) => {
			return action.payload;
		},
		deleteSuggestions: (state, action: PayloadAction<string>) => {
			return state.filter((sugg) => sugg.id != action.payload);
		},
	},
});

export default suggestionsSlice.reducer;

export const { setSuggestions, deleteSuggestions } = suggestionsSlice.actions;
