import { Admin, AdminResponse, CallError } from '../models/Admin';

export const LoginCall = async (email: string, password: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	};

	return fetch('http://localhost:8080/admins/login', requestOptions)
		.then(async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				throw new Error(err.message);
			}

			const data: AdminResponse = (await response.json()) as AdminResponse;
			return {
				id: data.adminFound._id,
				email: data.adminFound.email,
				password: data.adminFound.password,
				token: data.token,
			} as Admin;
		})
		.catch((err: string) => {
			console.log(err);
			return {
				id: '-1',
				email: err,
				password: '',
				token: '',
			} as Admin;
		});
};
