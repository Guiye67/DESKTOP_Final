import {
	Table,
	TableRow,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableBody,
} from '@tremor/react';
import { Client } from '../../models/Client';

interface Props {
	clients: Client[];
}

const generateClassesString = (classes: string[]): string => {
	let output = '';
	for (let i = 0; i < classes.length; i++) {
		if (i == classes.length - 1) output = output.concat(classes[i]);
		else output = output.concat(`${classes[i]}, `);
	}
	return output;
};

export const ClientsTable: React.FC<Props> = ({ clients }: Props) => {
	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell> ID </TableHeaderCell>
						<TableHeaderCell className="text-right">Name</TableHeaderCell>
						<TableHeaderCell className="text-right">Surname</TableHeaderCell>
						<TableHeaderCell className="text-right">Email</TableHeaderCell>
						<TableHeaderCell className="text-right">Payment</TableHeaderCell>
						<TableHeaderCell className="text-right">Classes</TableHeaderCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{clients.map((client) => (
						<TableRow key={client.id}>
							<TableCell>{client.id}</TableCell>
							<TableCell className="text-right">{client.name}</TableCell>
							<TableCell className="text-right">{client.surname}</TableCell>
							<TableCell className="text-right">{client.email}</TableCell>
							<TableCell className="text-right">{client.payment}</TableCell>
							<TableCell className="text-right">
								{generateClassesString(client.classes)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
