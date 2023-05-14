import {
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
	TextInput,
	Button,
} from '@tremor/react';
import { useAppSelector } from '../../hooks/store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Class } from '../../models/Class';

const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri'];

const getFilteredClasses = (filter: string, classes: Class[]) => {
	if (!filter) return classes;
	return classes.filter((item) => item.name.includes(filter));
};

interface Props {
	setToDelete: (value: string[]) => void;
}

export const ClassesTable: React.FC<Props> = ({ setToDelete }: Props) => {
	const classes = useAppSelector((state) => state.classes);
	const [filter, setFilter] = useState('');
	const [updating, setUpdating] = useState('');

	const filteredClasses = getFilteredClasses(filter, classes);

	return (
		<>
			<TextInput
				icon={MagnifyingGlassIcon}
				placeholder="Search class..."
				onChange={(e) => setFilter(e.target.value)}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Days</TableHeaderCell>
						<TableHeaderCell>Hour</TableHeaderCell>
						<TableHeaderCell>Duration</TableHeaderCell>
						<TableHeaderCell>Signed Up</TableHeaderCell>
						<TableHeaderCell className="text-right"></TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{filteredClasses.map((item) => (
						<TableRow key={item.id}>
							{
								/* updating == item.id ? (
								<>
									<ClientUpdater client={client} setUpdating={setUpdating} />
								</>
							) : */ <>
									<TableCell>{item.name}</TableCell>
									<TableCell>
										{days.map((day, index) => (
											<Button
												key={index}
												size="xs"
												disabled={!item.days.includes(day) && true}
												style={{ marginRight: '2px', width: '50px' }}
											>
												{day}
											</Button>
										))}
									</TableCell>
									<TableCell>{item.hour}</TableCell>
									<TableCell>{item.duration}</TableCell>
									<TableCell>{item.signedUp.length}</TableCell>
									<TableCell className="text-right">
										<i
											className="bi bi-pencil-square"
											onClick={() => {
												setUpdating(item.id);
											}}
										></i>
										<i
											className="bi bi-trash"
											onClick={() => setToDelete([item.id, item.name])}
										></i>
									</TableCell>
								</>
							}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
