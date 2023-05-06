import { LoginForm } from '../../components/login/LoginForm';
import '../../styles/LoginPage.css';

export default function LoginPage() {
	return (
		<>
			<div className="login">
				<div className="login-box">
					<h1>Login Page</h1>
					<LoginForm />
				</div>
			</div>
		</>
	);
}
