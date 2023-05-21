import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	Title,
	Text,
	Button,
} from '@tremor/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Diet } from '../../models/Diet';
import { useDietsActions } from '../../hooks/useDietsActions';

interface Props {
	setToUpdate: (value: Diet | null) => void;
	setToView: (value: Diet | null) => void;
	diet: Diet;
}

export const DietView: React.FC<Props> = ({
	setToUpdate,
	setToView,
	diet,
}: Props) => {
	const { updateDiet } = useDietsActions();
	const [status, setStatus] = useState(diet.resolved);

	const markAsResolved = () => {
		const resolve = async () => {
			const resolvedDiet: Diet = {
				id: diet.id,
				client: diet.client,
				age: diet.age,
				gender: diet.gender,
				weight: diet.weight,
				height: diet.height,
				objective: diet.objective,
				allergens: diet.allergens,
				resolved: true,
			};

			await updateDiet(resolvedDiet);
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

				<Button onClick={() => setToUpdate(diet)}>
					<i className="bi bi-pencil-square"></i>Edit
				</Button>
			</div>
			<div className="view-card">
				<Title>Diet ID: {diet.id}</Title>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>
								<Title>Client:</Title>
								<Text>{diet.client}</Text>
							</TableCell>
							<TableCell colSpan={2}>
								<Title>Age:</Title>
								<Text>{diet.age}</Text>
							</TableCell>
							<TableCell colSpan={2}>
								<Title>Gender:</Title>
								<Text>{diet.gender}</Text>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>
								<Title>Weight:</Title>
								<Text>{diet.weight}</Text>
							</TableCell>
							<TableCell colSpan={2}>
								<Title>Height:</Title>
								<Text>{diet.height}</Text>
							</TableCell>
							<TableCell colSpan={2}>
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
								<Title>Objective:</Title>
								<Text>{diet.objective}</Text>
							</TableCell>
							<TableCell colSpan={3}>
								<Title>Allergens:</Title>
								<Text>{diet.allergens}</Text>
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
