import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { useLoginActions } from '../../hooks/useLoginActions';

export const UserBox = () => {
	const user = useAppSelector((state) => state.login);
	const navigate = useNavigate();
	const { logout } = useLoginActions();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<>
			<p>{user.email}</p>
			<div>
				<ArrowLeftOnRectangleIcon onClick={handleLogout} />
			</div>
		</>
	);
};
