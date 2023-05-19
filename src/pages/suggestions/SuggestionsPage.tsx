import { Button, Card, TextInput } from '@tremor/react';
import { useSuggestionsActions } from '../../hooks/useSuggestionsActions';
import { Suggestion } from '../../models/Suggestion';
import '../../styles/SuggestionsPage.css';
import { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { SuggestionsTabe } from '../../components/suggestions/SuggestionsTable';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useAppSelector } from '../../hooks/store';

const getFilteredSuggestions = (filter: string, suggestions: Suggestion[]) => {
	if (!filter) return suggestions;
	return suggestions.filter((sugg) =>
		sugg.title.toLowerCase().includes(filter.toLowerCase())
	);
};

export default function SuggestionsPage() {
	const { deleteSuggestionById } = useSuggestionsActions();
	const suggestions = useAppSelector((state) => state.suggestions);

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);
	const [toView, setToView] = useState<Suggestion | null>();
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
				<button>Create New</button>
			</div>
			{/* creating && <CreatePostForm setCreating={setCreating} /> */}
			<Card
				style={
					creating
						? { borderRadius: '0.5rem' }
						: { borderRadius: '0 0.5rem 0.5rem 0.5rem' }
				}
			>
				{loading && <p>Loading...</p>}
				{result != 'ok' && (
					<>
						<p style={{ color: 'red' }}>Error Fetching Data: ({result})</p>
					</>
				)}
				{!loading && toView == null && (
					<>
						<TextInput
							icon={MagnifyingGlassIcon}
							placeholder="Search suggestion..."
							onChange={(e) => setFilter(e.target.value)}
						/>
						<SuggestionsTabe
							setToDelete={setToDelete}
							setToView={setToView}
							title="Unresolved"
							suggestions={suggestions.filter((sugg) => !sugg.resolved)}
						/>
						<SuggestionsTabe
							setToDelete={setToDelete}
							setToView={setToView}
							title="Resolved"
							suggestions={suggestions.filter((sugg) => sugg.resolved)}
						/>
					</>
				)}
				{/* !loading && toUpdate != null && (
					<PostUpdater
						post={toUpdate}
						setToUpdate={setToUpdate}
						setToView={setToView}
					/>
				) */}
				{/* !loading && toUpdate == null && toView != null && (
					<PostView
						post={toView}
						setToUpdate={setToUpdate}
						setToView={setToView}
					/>
				) */}
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
