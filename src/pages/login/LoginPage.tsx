import { LoginForm } from '../../components/login/LoginForm';
import '../../styles/LoginPage.css';

export default function LoginPage() {
	return (
		<>
			<div className="login">
				<div className="login-box">
					<h1>Welcome!!</h1>
					<h2>Please Log In</h2>
					<LoginForm />
				</div>
			</div>
		</>
	);
}
