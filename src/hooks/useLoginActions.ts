import { LoginCall } from '../services/LoginCalls';
import { doLogin, doLogout } from '../store/login/slice';
import { useAppDispatch } from './store';

export const useLoginActions = () => {
	const dispatch = useAppDispatch();

	const login = async (email: string, password: string): Promise<string> => {
		const admin = await LoginCall(email, password);

		if (admin.id == '-1') {
			console.log(admin.email);
			return admin.email;
		}

		dispatch(doLogin(admin));
		return 'ok';
	};

	const logout = () => {
		dispatch(doLogout());
	};

	return { login, logout };
};
