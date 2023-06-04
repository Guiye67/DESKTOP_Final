import { Admin, AdminResponse } from '../models/Admin';
import { CallError } from '../models/CallError';
import { IP } from '../utils/constants/constants';

export const LoginCall = async (email: string, password: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	};

	return fetch(`${IP}/admins/login`, requestOptions).then(async (response) => {
		if (response.status != 200) {
			const err: CallError = (await response.json()) as CallError;
			return {
				id: '-1',
				email: err.message,
				password: '',
				token: '',
			} as Admin;
		}

		const data: AdminResponse = (await response.json()) as AdminResponse;
		return {
			id: data.adminFound._id,
			email: data.adminFound.email,
			password: data.adminFound.password,
			token: data.token,
		} as Admin;
	});
};
