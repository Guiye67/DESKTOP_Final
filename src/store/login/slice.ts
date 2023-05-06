import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin } from '../../models/Admin';

const DEFAULT_STATE: Admin = {
	id: '-1',
	email: '',
	password: '',
	token: '',
};

const initialState: Admin = (() => {
	const persistedState = localStorage.getItem('logged__user');
	return persistedState != null
		? (JSON.parse(persistedState) as Admin)
		: DEFAULT_STATE;
})();

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		doLogin: (_state, action: PayloadAction<Admin>) => {
			console.log(action.payload);
			return { ...action.payload };
		},
		doLogout: () => {
			return { ...DEFAULT_STATE };
		},
	},
});

export default loginSlice.reducer;

export const { doLogin, doLogout } = loginSlice.actions;
