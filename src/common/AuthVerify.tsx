/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Admin } from '../models/Admin';
import { useLoginActions } from '../hooks/useLoginActions';

interface AtobResponse {
	client: {
		email: string;
		password: string;
		_id: string;
	};
	exp: number;
	iat: number;
}

const parseJwt = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1])) as AtobResponse;
	} catch (e) {
		return null;
	}
};

export const AuthVerify = () => {
	const location = useLocation();
	const { logout } = useLoginActions();
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem('logged__user');
		const parsedUser = user ? (JSON.parse(user) as Admin) : null;

		if (parsedUser) {
			const decodedJwt = parseJwt(parsedUser.token);

			if (decodedJwt != null && decodedJwt.exp * 1000 < Date.now()) {
				alert('Session Expired, Log In Again');
				logout();
				navigate('/');
			}
		}
	}, [location]);

	return <div></div>;
};
