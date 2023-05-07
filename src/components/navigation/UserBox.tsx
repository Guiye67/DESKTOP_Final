import { useAppSelector } from '../../hooks/store';

export const UserBox = () => {
	const user = useAppSelector((state) => state.login);

	return (
		<>
			<p>
				<strong>User:</strong> {user.email}
			</p>
		</>
	);
};
