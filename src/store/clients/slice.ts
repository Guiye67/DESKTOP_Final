import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../../models/Client';

const DEFAULT_STATE: Client[] = [];

export const loginSlice = createSlice({
	name: 'login',
	initialState: DEFAULT_STATE,
	reducers: {
		setClients: (_state, action: PayloadAction<Client[]>) => {
			return action.payload;
		},
		updateClient: (state, action: PayloadAction<Client>) => {
			const clientIndex = state.findIndex(
				(client) => client.id == action.payload.id
			);
			return {
				...state,
				...(state[clientIndex] = action.payload),
			};
		},
		deleteClient: (state, action: PayloadAction<string>) => {
			return state.filter((client) => client.id != action.payload);
		},
	},
});

export default loginSlice.reducer;

export const { setClients, updateClient, deleteClient } = loginSlice.actions;
