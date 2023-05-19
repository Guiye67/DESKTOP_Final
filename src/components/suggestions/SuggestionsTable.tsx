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
import { Suggestion } from '../../models/Suggestion';

interface Props {
	setToDelete: (value: string[]) => void;
	setToView: (value: Suggestion | null) => void;
	title: string;
	suggestions: Suggestion[];
}

export const SuggestionsTabe: React.FC<Props> = ({
	setToDelete,
	setToView,
	title,
	suggestions,
}: Props) => {
	return (
		<>
			<Title>
				{title}{' '}
				{title == 'Unresolved' && suggestions.length > 0 && (
					<Badge color="red">{suggestions.length}</Badge>
				)}
			</Title>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>ID</TableHeaderCell>
						<TableHeaderCell>Title</TableHeaderCell>
						<TableHeaderCell>Client</TableHeaderCell>
						<TableHeaderCell>Description</TableHeaderCell>
						<TableHeaderCell className="text-right"></TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{suggestions.map((sugg) => (
						<TableRow key={sugg.id}>
							<TableCell>{sugg.id}</TableCell>
							<TableCell>{sugg.title}</TableCell>
							<TableCell>{sugg.client}</TableCell>
							<TableCell className="w-full">
								{sugg.description.length > 50
									? `${sugg.description.slice(0, 50)}...`
									: sugg.description}
							</TableCell>
							<TableCell className="text-right">
								<i
									className="bi bi-zoom-in"
									onClick={() => {
										setToView(sugg);
									}}
								></i>
								<i
									className="bi bi-trash"
									onClick={() => setToDelete([sugg.id, sugg.title])}
								></i>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
