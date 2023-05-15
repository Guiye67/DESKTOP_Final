import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../../models/Client';

const DEFAULT_STATE: Client[] = [];

export const clientsSlice = createSlice({
	name: 'clients',
	initialState: DEFAULT_STATE,
	reducers: {
		setClients: (_state, action: PayloadAction<Client[]>) => {
			return action.payload;
		},
		deleteClient: (state, action: PayloadAction<string>) => {
			return state.filter((client) => client.id != action.payload);
		},
	},
});

export default clientsSlice.reducer;

export const { setClients, deleteClient } = clientsSlice.actions;
