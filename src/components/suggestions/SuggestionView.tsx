import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Title,
	Text,
	Button,
} from '@tremor/react';
import { Suggestion } from '../../models/Suggestion';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { CustomTextArea } from '../custom/CustomTextArea';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { useState } from 'react';

interface Props {
	setToUpdate: (value: Suggestion | null) => void;
	setToView: (value: Suggestion | null) => void;
	suggestion: Suggestion;
}

export const SuggestionView: React.FC<Props> = ({
	setToUpdate,
	setToView,
	suggestion,
}: Props) => {
	const { updateSuggestion } = useSuggestionsActions();
	const [status, setStatus] = useState(suggestion.resolved);

	const markAsResolved = () => {
		const resolve = async () => {
			const resolvedSuggestion: Suggestion = {
				id: suggestion.id,
				title: suggestion.title,
				client: suggestion.client,
				description: suggestion.description,
				resolved: true,
			};
			await updateSuggestion(resolvedSuggestion);
			setStatus(true);
		};

		void resolve();
	};

	return (
		<>
			<div className="view-nav-buttons">
				<Button onClick={() => setToView(null)} icon={ArrowLongLeftIcon}>
					Back
				</Button>

				<Button onClick={() => setToUpdate(suggestion)}>
					<i className="bi bi-pencil-square"></i>Edit
				</Button>
			</div>
			<div className="view-card">
				<Title>Suggestion ID: {suggestion.id}</Title>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<Title>Title:</Title>
								<Text>{suggestion.title}</Text>
							</TableCell>
							<TableCell>
								<Title>Client:</Title>
								<Text>{suggestion.client}</Text>
							</TableCell>
							<TableCell>
								<Title>Status:</Title>
								{status ? (
									<Text color="green">Resolved</Text>
								) : (
									<Text color="red">Unresolved</Text>
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={3}>
								<Title>Description: </Title>
								<CustomTextArea
									value={suggestion.description}
									onChange={() => {}}
									placeholder="Description..."
									disabled={true}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<div className={status ? 'hidden' : 'text-right'}>
					<Button id="resolve-button" onClick={() => markAsResolved()}>
						Marked as Resolved
					</Button>
				</div>
			</div>
		</>
	);
};
