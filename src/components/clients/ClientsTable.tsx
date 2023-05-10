import {
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
	TextInput,
} from '@tremor/react';
import { useClientActions } from '../../hooks/useClientsActions';
import { useAppSelector } from '../../hooks/store';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Client } from '../../models/Client';

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
	return clients.filter((client) => client.email.includes(filter));
};

export const ClientsTable = () => {
	const { deleteClientById } = useClientActions();
	const clients = useAppSelector((state) => state.clients);
	const [filter, setFilter] = useState('');
	const [edit, setEdit] = useState(false);

	const filteredClients = getFilteredClients(filter, clients);

	const handleEdit = () => {
		// continue here
	};

	const handleDelete = async (id: string) => {
		await deleteClientById(id);
	};

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
							{/* edit : (<p>Editting...</p>) ? (<p></p>) */}
							<TableCell>{client.id}</TableCell>
							<TableCell>{client.email}</TableCell>
							<TableCell>{client.name}</TableCell>
							<TableCell>{client.surname}</TableCell>
							<TableCell>{client.payment}</TableCell>
							<TableCell className="text-right">
								{generateClassesString(client.classes)}
							</TableCell>
							<TableCell className="text-right">
								<i className="bi bi-pencil-square" onClick={handleEdit}></i>
								<i
									className="bi bi-trash"
									onClick={() => void handleDelete(client.id)}
								></i>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
