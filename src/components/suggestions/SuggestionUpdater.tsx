import { useState, useEffect } from 'react';
import { Suggestion } from '../../models/Suggestion';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { useAppSelector } from '../../hooks/store';
import { useClientsActions } from '../../hooks/useClientsActions';
import {
	Button,
	SelectBox,
	SelectBoxItem,
	Table,
	TableBody,
	TableRow,
	TextInput,
	Title,
} from '@tremor/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { Alert, TableCell } from '@mui/material';
import { CustomTextArea } from '../custom/CustomTextArea';

interface Props {
	suggestion: Suggestion;
	setToView: (value: Suggestion | null) => void;
	setToUpdate: (value: Suggestion | null) => void;
}

export const SuggestionUpdater: React.FC<Props> = ({
	suggestion,
	setToView,
	setToUpdate,
}: Props) => {
	const { updateSuggestion } = useSuggestionsActions();
	const [title, setTitle] = useState(suggestion.title);
	const [suggClient, setSuggClient] = useState(suggestion.client);
	const [description, setDescription] = useState(suggestion.description);
	const [result, setResult] = useState('ok');
	const clients = useAppSelector((state) => state.clients);
	const [loadingClients, setloadingClients] = useState(false);
	const { getClients } = useClientsActions();

	useEffect(() => {
		const getAllClasses = async () => {
			setloadingClients(true);
			await getClients();
			setloadingClients(false);
		};

		if (clients.length == 0) void getAllClasses();
	}, []);

	const handleSubmit = () => {
		const update = async (updatedSuggestion: Suggestion) => {
			const res = await updateSuggestion(updatedSuggestion);

			setResult(res);

			setToUpdate(null);
			setToView(null);

			setTimeout(() => {
				setResult('ok');
			}, 2000);
		};

		const updatedSuggestion: Suggestion = {
			id: suggestion.id,
			title,
			client: suggClient,
			description,
			resolved: suggestion.resolved,
		};

		void update(updatedSuggestion);
	};

	return (
		<>
			<div className="view-nav-buttons">
				<Button
					onClick={() => {
						setToUpdate(null);
						setToView(null);
					}}
					icon={ArrowLongLeftIcon}
				>
					Cancel
				</Button>

				<Button onClick={() => handleSubmit()}>Save</Button>
			</div>
			<div className="updater-form">
				{result != 'ok' ? (
					<Alert severity="error">Error: {result}</Alert>
				) : (
					<>
						<Title>Updating: {suggestion.id}</Title>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>
										<Title>Title:</Title>
										<TextInput
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Title..."
										/>
									</TableCell>
									<TableCell>
										<Title>Client:</Title>
										{loadingClients ? (
											<p>Loading...</p>
										) : (
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
										)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={2}>
										<Title>Description: </Title>
										<CustomTextArea
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											placeholder="Description..."
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</>
				)}
			</div>
		</>
	);
};
