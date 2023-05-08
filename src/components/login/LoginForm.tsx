import { useState } from 'react';
import { useLoginActions } from '../../hooks/useLoginActions';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
	const [passwordShown, setPasswordShown] = useState(false);
	const [result, setResult] = useState<string>('ok');
	const { login } = useLoginActions();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

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

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	return (
		<>
			{/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
			<form onSubmit={handleSubmit} method="post">
				<p>
					<label htmlFor="email">Email:</label>
					<br />
					<input type="text" name="email" />
				</p>
				<p>
					<label htmlFor="password">Password:</label>
					<br />
					<input type={passwordShown ? 'text' : 'password'} name="password" />
					<i
						className={passwordShown ? 'bi-eye' : 'bi bi-eye-slash'}
						id="togglePassword"
						onClick={togglePassword}
					></i>
				</p>

				<button type="submit">Login</button>
			</form>
			{result != 'ok' && (
				<Alert severity="error" className="alert">
					{result}
				</Alert>
			)}
		</>
	);
};
