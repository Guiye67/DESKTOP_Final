import { Card } from '@tremor/react';
import { useState, useEffect } from 'react';
import { GetAllClasses } from '../../services/ClassesCalls';
import { ClientNew } from '../../models/Client';
import { useClientActions } from '../../hooks/useClientsActions';
import { Alert } from '@mui/material';

interface Props {
	setCreating: (value: boolean) => void;
	token: string;
}

export const CreateClientForm: React.FC<Props> = ({
	setCreating,
	token,
}: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [loadingClasses, setloadingClasses] = useState(false);
	const [classes, setClasses] = useState<string[]>([]);
	const [clientClasses, setClientClasses] = useState<string[]>([]);
	const { createNewClient } = useClientActions();

	const getClasses = async () => {
		setloadingClasses(true);
		const allClasses = await GetAllClasses(token);
		const list: string[] = [];
		allClasses.forEach((item) => {
			list.push(item.name);
		});
		setClasses(list);
		setloadingClasses(false);
	};

	useEffect(() => {
		if (classes.length == 0) void getClasses();
	}, []);

	const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('password') as string;
		const surname = formData.get('password') as string;

		const newClient: ClientNew = {
			email,
			password,
			name,
			surname,
			payment: '0',
			classes: clientClasses,
		};

		const postResult = await createNewClient(newClient, token);

		setLoading(false);

		if (postResult != 'ok') {
			setResult(postResult);
		} else {
			setResult('ok');
			form.reset();
			setTimeout(() => {
				setCreating(false);
			}, 1000);
		}
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newList: string[] = clientClasses;
		if (event.target.checked) {
			newList.push(event.target.value);
		} else {
			newList = newList.filter((x) => x !== event.target.value);
		}
		setClientClasses(newList);
	};

	return (
		<>
			<Card className="create-card">
				<p>New client form</p>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={handleCreate}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="email">Email:</label>
								</td>
								<td>
									<input name="email" type="text" />
								</td>
								<td>
									<label htmlFor="password">Password:</label>
								</td>
								<td>
									<input name="password" type="password" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="name">Name:</label>
								</td>
								<td>
									<input name="name" type="text" />
								</td>
								<td>
									<label htmlFor="surname">Surname:</label>
								</td>
								<td>
									<input name="surname" type="text" />
								</td>
							</tr>
							<tr>
								<td colSpan={4}>
									<strong>Classes: </strong>
								</td>
							</tr>
							<tr>
								<td colSpan={4}>
									{loadingClasses ? (
										<Alert severity="info" className="alert">
											Loading...
										</Alert>
									) : (
										<>
											{classes.map((item, index) => (
												<label className="checkbox-label" key={index}>
													<input
														key={index}
														type="checkbox"
														id={item}
														value={item}
														onChange={handleCheckboxChange}
													/>{' '}
													{item}
												</label>
											))}
										</>
									)}
								</td>
							</tr>
							<tr>
								<td colSpan={4} className="btns-cell">
									<button id="create-btn" type="submit">
										Create
									</button>
									<button
										id="cancel-btn"
										type="reset"
										onClick={() => setCreating(false)}
									>
										Cancel
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				{loading && (
					<Alert severity="info" className="alert">
						Loading...
					</Alert>
				)}
				{!loading && result != '' && result != 'ok' && (
					<Alert severity="error" className="alert">
						Error: {result}
					</Alert>
				)}
				{!loading && result != '' && result == 'ok' && (
					<Alert severity="success" className="alert">
						Success: Client created
					</Alert>
				)}
			</Card>
		</>
	);
};