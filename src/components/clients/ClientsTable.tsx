import {
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
	TextInput,
} from '@tremor/react';
import { useAppSelector } from '../../hooks/store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Client } from '../../models/Client';
import { ClientUpdater } from './ClientUpdater';

const generateClassesString = (classes: string[]): string => {
	let output = '';
	for (let i = 0; i < classes.length; i++) {
		if (i == classes.length - 1) output = output.concat(classes[i]);
		else output = output.concat(`${classes[i]}, `);
	}
	return output;
};

const getFilteredClients = (filter: string, clients: Client[]) => {
	if (!filter) return clients;
	return clients.filter((client) =>
		client.email.toLowerCase().includes(filter.toLowerCase())
	);
};

interface Props {
	setToDelete: (value: string[]) => void;
}

export const ClientsTable: React.FC<Props> = ({ setToDelete }: Props) => {
	const clients = useAppSelector((state) => state.clients);
	const [filter, setFilter] = useState('');
	const [updating, setUpdating] = useState('');

	const filteredClients = getFilteredClients(filter, clients);

	return (
		<>
			<TextInput
				icon={MagnifyingGlassIcon}
				placeholder="Search email..."
				onChange={(e) => setFilter(e.target.value)}
			/>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell> ID </TableHeaderCell>
						<TableHeaderCell>Email</TableHeaderCell>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Surname</TableHeaderCell>
						<TableHeaderCell>Payment</TableHeaderCell>
						<TableHeaderCell className="text-right">Classes</TableHeaderCell>
						<TableHeaderCell className="text-right"></TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{filteredClients.map((client) => (
						<TableRow key={client.id}>
							{updating == client.id ? (
								<>
									<ClientUpdater client={client} setUpdating={setUpdating} />
								</>
							) : (
								<>
									<TableCell>{client.id}</TableCell>
									<TableCell>{client.email}</TableCell>
									<TableCell>{client.name}</TableCell>
									<TableCell>{client.surname}</TableCell>
									<TableCell
										style={
											Date.parse(client.payment) < new Date().getTime() ||
											client.payment == '0'
												? { color: 'red' }
												: { color: 'green' }
										}
									>
										{client.payment == '0'
											? '0'
											: new Date(client.payment).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-right">
										{generateClassesString(client.classes)}
									</TableCell>
									<TableCell className="text-right">
										<i
											className="bi bi-pencil-square"
											onClick={() => {
												setUpdating(client.id);
											}}
										></i>
										<i
											className="bi bi-trash"
											onClick={() => setToDelete([client.id, client.email])}
										></i>
									</TableCell>
								</>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
