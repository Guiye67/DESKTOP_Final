import { useState } from 'react';
import { useLoginActions } from '../../hooks/useLoginActions';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '@tremor/react';

export const LoginForm = () => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [result, setResult] = useState<string>('ok');
	const { login } = useLoginActions();
	const navigate = useNavigate();

	const doLogin = async (
		email: string,
		password: string,
		form: EventTarget & HTMLFormElement
	) => {
		const loginResult = await login(email, password);

		if (loginResult != 'ok') {
			setResult(loginResult);
		} else {
			navigate('/clients');
		}

		form.reset();
		setTimeout(() => {
			setResult('ok');
		}, 3000);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		void doLogin(email, password, form);
	};

	return (
		<>
			<form onSubmit={handleSubmit} method="post">
				<label htmlFor="email">Email:</label>
				<TextInput type="text" name="email" placeholder="" />
				<label htmlFor="password">Password:</label>
				<i
					className={passwordShown ? 'bi-eye' : 'bi bi-eye-slash'}
					id="togglePassword"
					onClick={() => setPasswordShown(!passwordShown)}
				></i>

				<TextInput
					type={passwordShown ? 'text' : 'password'}
					name="password"
					placeholder=""
				/>

				<button type="submit">Log In</button>
			</form>
			{result != 'ok' && (
				<Alert severity="error" className="alert">
					{result}
				</Alert>
			)}
		</>
	);
};
