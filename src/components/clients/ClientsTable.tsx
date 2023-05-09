import {
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
} from '@tremor/react';
import { useClientActions } from '../../hooks/useClientsActions';
import { useAppSelector } from '../../hooks/store';

interface Props {
	token: string;
}

export const ClientsTable: React.FC<Props> = ({ token }: Props) => {
	const { deleteClientById } = useClientActions();
	const clients = useAppSelector((state) => state.clients);

	const handleEdit = () => {};

	const handleDelete = async (id: string) => {
		await deleteClientById(id, token);
	};

	const generateClassesString = (classes: string[]): string => {
		let output = '';
		for (let i = 0; i < classes.length; i++) {
			if (i == classes.length - 1) output = output.concat(classes[i]);
			else output = output.concat(`${classes[i]}, `);
		}
		return output;
	};

	return (
		<>
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
					{clients.map((client) => (
						<TableRow key={client.id}>
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
