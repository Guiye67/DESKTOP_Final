import { Button, Card, TextInput } from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import '../../styles/DietsPage.css';
import { Diet } from '../../models/Diet';
import { useAppSelector } from '../../hooks/store';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { DietsTable } from '../../components/diets/DietsTable';
import { CreateDietForm } from '../../components/diets/CreateDietForm';
import { useDietsActions } from '../../hooks/useDietsActions';
import { DietView } from '../../components/diets/DietView';
import { DietUpdater } from '../../components/diets/DietUpdater';

const getFilteredDiets = (filter: string, diets: Diet[]) => {
	if (!filter) return diets;
	return diets.filter((diet) =>
		diet.client.toLowerCase().includes(filter.toLowerCase())
	);
};

export default function DietsPage() {
	const { deleteDietById } = useDietsActions();
	const diets = useAppSelector((state) => state.diets);

	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);
	const [toView, setToView] = useState<Diet | null>();
	const [toUpdate, setToUpdate] = useState<Diet | null>();
	const [filter, setFilter] = useState('');

	const filteredDiets = getFilteredDiets(filter, diets);

	const handleDelete = () => {
		void deleteDietById(toDelete[0]);
		setToDelete(['']);
	};

	return (
		<div className="diets-page">
			<div className="title">
				<h1>Diets</h1>
				<Button onClick={() => setCreating(true)}>Create New</Button>
			</div>
			{creating && <CreateDietForm setCreating={setCreating} />}
			<Card
				style={
					creating
						? { borderRadius: '0.5rem' }
						: { borderRadius: '0 0.5rem 0.5rem 0.5rem' }
				}
			>
				{diets.length == 0 && (
					<>
						<p style={{ color: 'red' }}>No diets found in database</p>
					</>
				)}
				{toView == null && (
					<>
						<TextInput
							icon={MagnifyingGlassIcon}
							placeholder="Search diet by client email..."
							onChange={(e) => setFilter(e.target.value)}
							className="mb-2"
						/>
						<DietsTable
							setToDelete={setToDelete}
							setToView={setToView}
							title="Unresolved"
							diets={filteredDiets.filter((diet) => !diet.resolved)}
						/>
						<hr
							style={{ borderColor: 'var(--color-dark-purple)' }}
							className="mb-2 mt-4"
						/>
						<DietsTable
							setToDelete={setToDelete}
							setToView={setToView}
							title="Resolved"
							diets={filteredDiets.filter((diet) => diet.resolved)}
						/>
					</>
				)}
				{toUpdate != null && (
					<DietUpdater
						diet={toUpdate}
						setToUpdate={setToUpdate}
						setToView={setToView}
					/>
				)}
				{toUpdate == null && toView != null && (
					<DietView
						diet={toView}
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
					You are about to delete a diet from <strong>{toDelete[1]}</strong>
				</Alert>
			)}
		</div>
	);
}
