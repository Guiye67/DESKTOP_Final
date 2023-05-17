import { useEffect } from 'react';
import { LoginForm } from '../../components/login/LoginForm';
import '../../styles/LoginPage.css';
import { useAppSelector } from '../../hooks/store';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
	const user = useAppSelector((state) => state.login);
	const navigate = useNavigate();

	useEffect(() => {
		if (user.id != '-1') navigate('/clients');
	});

	return (
		<>
			<div className="login">
				<div className="login-box">
					<img src="/gymyang_logo.png" alt="Gym&Yang Logo" />
					<h1>Welcome!!</h1>
					<h2>Please Log In</h2>
					<LoginForm />
				</div>
			</div>
		</>
	);
}
