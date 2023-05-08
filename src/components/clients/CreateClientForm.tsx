import { Card } from '@tremor/react';
import { useState, useEffect } from 'react';
import { GetAllClasses } from '../../services/ClassesCalls';
import { Client, ClientNew } from '../../models/Client';
import { CreateClient } from '../../services/ClientCalls';

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
	const [classes, setClasses] = useState<string[]>([]);
	const [clientClasses, setClientClasses] = useState<string[]>([]);

	const getClasses = async () => {
		setLoading(true);
		const allClasses = await GetAllClasses(token);
		const list: string[] = [];
		allClasses.forEach((item) => {
			list.push(item.name);
		});
		setClasses(list);
		setLoading(false);
	};

	useEffect(() => {
		if (classes.length == 0) void getClasses();
	}, []);

	const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
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

		console.log(JSON.stringify(newClient));

		const postResult = await CreateClient(newClient, token);

		console.log(postResult);

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
		console.log(newList);
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
									{loading ? (
										<p>Loading...</p>
									) : (
										<>
											{classes.map((item) => (
												<>
													<label className="checkbox-label">
														<input
															type="checkbox"
															id={item}
															value={item}
															onChange={handleCheckboxChange}
														/>{' '}
														{item}
													</label>
												</>
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
									<button id="cancel-btn" onClick={() => setCreating(false)}>
										Cancel
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				{result != '' && result != 'ok' && (
					<p style={{ color: 'red' }}>Error: {result}</p>
				)}
				{result != '' && result == 'ok' && (
					<p style={{ color: 'darkgreen' }}>Success: Client created</p>
				)}
			</Card>
		</>
	);
};
