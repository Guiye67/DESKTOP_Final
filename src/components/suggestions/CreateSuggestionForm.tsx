import { useState, useEffect } from 'react';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { SuggestionNew } from '../../models/Suggestion';
import {
	Button,
	Card,
	SelectBox,
	SelectBoxItem,
	TextInput,
} from '@tremor/react';
import { useAppSelector } from '../../hooks/store';
import { useClientsActions } from '../../hooks/useClientsActions';
import { CustomTextArea } from '../custom/CustomTextArea';
import { Alert } from '@mui/material';

interface Props {
	setCreating: (value: boolean) => void;
}

export const CreateSuggestionForm: React.FC<Props> = ({
	setCreating,
}: Props) => {
	const [result, setResult] = useState('');
	const [loading, setLoading] = useState(false);
	const { createNewSuggestion } = useSuggestionsActions();
	const clients = useAppSelector((state) => state.clients);
	const [loadingClients, setloadingClients] = useState(false);
	const { getClients } = useClientsActions();
	const [suggClient, setSuggClient] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		const getAllClients = async () => {
			setloadingClients(true);
			await getClients();
			setloadingClients(false);
		};

		if (clients.length == 0) void getAllClients();
	}, []);

	const createSuggestion = async (
		newSuggestion: SuggestionNew,
		form: EventTarget & HTMLFormElement
	) => {
		setLoading(true);

		const postResult = await createNewSuggestion(newSuggestion);

		setLoading(false);

		if (postResult != 'ok') {
			setResult(postResult);
		} else {
			setResult('ok');
			setSuggClient('');
			setDescription('');
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

		const title = formData.get('title') as string;

		const newSuggestion: SuggestionNew = {
			title,
			client: suggClient,
			description,
		};

		void createSuggestion(newSuggestion, form);
	};

	return (
		<>
			<Card
				className="create-card"
				style={{ borderRadius: '0 0.5rem 0.5rem 0.5rem' }}
			>
				<p id="create-title">New suggestion form</p>
				<form onSubmit={handleCreate}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="title">Title:</label> <br />
									<TextInput name="title" type="text" />
								</td>

								<td>
									{loadingClients ? (
										<p>Loading...</p>
									) : (
										<>
											<label>Client:</label>{' '}
											<SelectBox
												value={suggClient}
												onValueChange={(value) => setSuggClient(value)}
												className="select-client"
											>
												{clients.map((item, index) => (
													<SelectBoxItem
														value={item.email}
														text={item.email}
														key={index}
													/>
												))}
											</SelectBox>
										</>
									)}
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<label>Description:</label>
								</td>
							</tr>
							<tr>
								<td colSpan={2}>
									<CustomTextArea
										value={description}
										onChange={(e) => setDescription(e.currentTarget.value)}
										placeholder="Description..."
									/>
								</td>
							</tr>
							<tr>
								<td colSpan={2} className="btns-cell">
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
