import { Button, Card, TextInput } from '@tremor/react';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { Suggestion } from '../../models/Suggestion';
import '../../styles/SuggestionsPage.css';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { SuggestionsTabe } from '../../components/suggestions/SuggestionsTable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../hooks/store';
import { CreateSuggestionForm } from '../../components/suggestions/CreateSuggestionForm';
import { SuggestionView } from '../../components/suggestions/SuggestionView';
import { SuggestionUpdater } from '../../components/suggestions/SuggestionUpdater';

const getFilteredSuggestions = (filter: string, suggestions: Suggestion[]) => {
	if (!filter) return suggestions;
	return suggestions.filter((sugg) =>
		sugg.title.toLowerCase().includes(filter.toLowerCase())
	);
};

export default function SuggestionsPage() {
	const { deleteSuggestionById } = useSuggestionsActions();
	const suggestions = useAppSelector((state) => state.suggestions);

	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);
	const [toView, setToView] = useState<Suggestion | null>();
	const [toUpdate, setToUpdate] = useState<Suggestion | null>();
	const [filter, setFilter] = useState('');

	const filteredSuggestions = getFilteredSuggestions(filter, suggestions);

	const handleDelete = () => {
		void deleteSuggestionById(toDelete[0]);
		setToDelete(['']);
	};

	return (
		<div className="suggestions-page">
			<div className="title">
				<h1>Suggestions</h1>
				<Button onClick={() => setCreating(true)}>Create New</Button>
			</div>
			{creating && <CreateSuggestionForm setCreating={setCreating} />}
			<Card
				style={
					creating
						? { borderRadius: '0.5rem' }
						: { borderRadius: '0 0.5rem 0.5rem 0.5rem' }
				}
			>
				{suggestions.length == 0 && (
					<>
						<p style={{ color: 'red' }}>No suggestions found in database</p>
					</>
				)}
				{toView == null && (
					<>
						<TextInput
							icon={MagnifyingGlassIcon}
							placeholder="Search suggestion..."
							onChange={(e) => setFilter(e.target.value)}
							className="mb-2"
						/>
						<SuggestionsTabe
							setToDelete={setToDelete}
							setToView={setToView}
							title="Unresolved"
							suggestions={filteredSuggestions.filter((sugg) => !sugg.resolved)}
						/>
						<hr
							style={{ borderColor: 'var(--color-dark-purple)' }}
							className="mb-2 mt-4"
						/>
						<SuggestionsTabe
							setToDelete={setToDelete}
							setToView={setToView}
							title="Resolved"
							suggestions={filteredSuggestions.filter((sugg) => sugg.resolved)}
						/>
					</>
				)}
				{toUpdate != null && (
					<SuggestionUpdater
						suggestion={toUpdate}
						setToUpdate={setToUpdate}
						setToView={setToView}
					/>
				)}
				{toUpdate == null && toView != null && (
					<SuggestionView
						suggestion={toView}
						setToUpdate={setToUpdate}
						setToView={setToView}
					/>
				)}
			</Card>

			{toDelete[0] != '' && (
				<Alert
					id="confirmation-alert"
					severity="warning"
					action={
						<>
							<Button
								color="green"
								size="xs"
								style={{ marginRight: '5px' }}
								onClick={handleDelete}
							>
								Delete
							</Button>
							<Button color="red" size="xs" onClick={() => setToDelete([''])}>
								Cancel
							</Button>
						</>
					}
				>
					You are about to delete suggestion <strong>{toDelete[1]}</strong>
				</Alert>
			)}
		</div>
	);
}
