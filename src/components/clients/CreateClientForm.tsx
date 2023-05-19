import {
	Button,
	Card,
	MultiSelectBox,
	MultiSelectBoxItem,
	TextInput,
} from '@tremor/react';
import { useState, useEffect } from 'react';
import { ClientNew } from '../../models/Client';
import { useClientsActions } from '../../hooks/useClientsActions';
import { useClassesActions } from '../../hooks/useClassesActions';
import { Alert } from '@mui/material';
import { useAppSelector } from '../../hooks/store';

interface Props {
	setCreating: (value: boolean) => void;
}

export const CreateClientForm: React.FC<Props> = ({ setCreating }: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const [loadingClasses, setloadingClasses] = useState(false);
	const classes = useAppSelector((state) => state.classes);
	const [clientClasses, setClientClasses] = useState<string[]>([]);
	const { getClasses } = useClassesActions();
	const { createNewClient } = useClientsActions();

	useEffect(() => {
		const getAllClasses = async () => {
			setloadingClasses(true);
			await getClasses();
			setloadingClasses(false);
		};

		if (classes.length == 0) void getAllClasses();
	}, []);

	const createClient = async (
		newClient: ClientNew,
		form: EventTarget & HTMLFormElement
	) => {
		setLoading(true);

		const postResult = await createNewClient(newClient);

		setLoading(false);

		if (postResult != 'ok') {
			setResult(postResult);
		} else {
			setResult('ok');
			form.reset();
			setTimeout(() => {
				setCreating(false);
			}, 1500);
		}
	};

	const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const surname = formData.get('surname') as string;

		const newClient: ClientNew = {
			email,
			password,
			name,
			surname,
			payment: '0',
			classes: clientClasses,
		};

		void createClient(newClient, form);
	};

	return (
		<>
			<Card className="create-card">
				<p>New client form</p>
				<form onSubmit={handleCreate}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="email">Email:</label>
								</td>
								<td>
									<TextInput name="email" type="text" />
								</td>
								<td>
									<label htmlFor="password">Password:</label>
								</td>
								<td>
									<TextInput name="password" type="password" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="name">Name:</label>
								</td>
								<td>
									<TextInput name="name" type="text" />
								</td>
								<td>
									<label htmlFor="surname">Surname:</label>
								</td>
								<td>
									<TextInput name="surname" type="text" />
								</td>
							</tr>
							<tr>
								<td colSpan={4}>
									{loadingClasses ? (
										<p>Loading...</p>
									) : (
										<>
											<label>Classes:</label>{' '}
											<MultiSelectBox
												value={clientClasses}
												onValueChange={setClientClasses}
												className="select-classes"
											>
												{classes.map((item, index) => (
													<MultiSelectBoxItem
														value={item.name}
														text={item.name}
														key={index}
													/>
												))}
											</MultiSelectBox>
										</>
									)}
								</td>
							</tr>
							<tr>
								<td colSpan={4} className="btns-cell">
									<Button id="create-btn" type="submit" loading={loading}>
										Create
									</Button>
									<Button
										id="cancel-btn"
										type="reset"
										onClick={() => setCreating(false)}
									>
										Cancel
									</Button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
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
