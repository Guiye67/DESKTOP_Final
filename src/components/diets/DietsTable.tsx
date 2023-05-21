import {
	Badge,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from '@tremor/react';
import { Diet } from '../../models/Diet';

interface Props {
	setToDelete: (value: string[]) => void;
	setToView: (value: Diet | null) => void;
	title: string;
	diets: Diet[];
}

export const DietsTable: React.FC<Props> = ({
	setToDelete,
	setToView,
	title,
	diets,
}: Props) => {
	return (
		<>
			<div>
				<Title className="inline mr-2">{title}</Title>
				{title == 'Unresolved' && diets.length > 0 && (
					<Badge color="red">{diets.length}</Badge>
				)}
			</div>

			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>ID</TableHeaderCell>
						<TableHeaderCell>Client</TableHeaderCell>
						<TableHeaderCell>Objective</TableHeaderCell>
						<TableHeaderCell className="text-right"></TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{diets.map((diet) => (
						<TableRow key={diet.id}>
							<TableCell>{diet.id}</TableCell>
							<TableCell>{diet.client}</TableCell>
							<TableCell className="w-full">
								{diet.objective.length > 30
									? `${diet.objective.slice(0, 30)}...`
									: diet.objective}
							</TableCell>
							<TableCell className="text-right">
								<i
									className="bi bi-zoom-in"
									onClick={() => {
										setToView(diet);
									}}
								></i>
								<i
									className="bi bi-trash"
									onClick={() => setToDelete([diet.id, diet.client])}
								></i>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
