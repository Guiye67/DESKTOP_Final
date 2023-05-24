import { MultiSelectBox, MultiSelectBoxItem, TableCell } from '@tremor/react';
import { Client } from '../../models/Client';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/store';
import { useClassesActions } from '../../hooks/useClassesActions';
import { useClientsActions } from '../../hooks/useClientsActions';
import { Alert } from '@mui/material';

interface Props {
	client: Client;
	setUpdating: (value: string) => void;
}

export const ClientUpdater: React.FC<Props> = ({
	client,
	setUpdating,
}: Props) => {
	const classes = useAppSelector((state) => state.classes);
	const { getClasses } = useClassesActions();
	const { updateClient } = useClientsActions();
	const [email, setEmail] = useState(client.email);
	const [name, setName] = useState(client.name);
	const [surname, setSurname] = useState(client.surname);
	const [payment, setPayment] = useState(client.payment);
	const [newClasses, setNewClasses] = useState<string[]>(client.classes);
	const [result, setResult] = useState('ok');

	useEffect(() => {
		const getAllClasses = async () => {
			await getClasses();
		};

		if (classes.length == 0) void getAllClasses();
	}, []);

	const handleSubmit = () => {
		const update = async (updatedClient: Client) => {
			const res = await updateClient(updatedClient);

			if (res == 'ok') setUpdating('');

			setResult(res);

			setTimeout(() => {
				setResult('ok');
			}, 2000);
		};

		const updatedClient: Client = {
			id: client.id,
			email,
			name,
			surname,
			payment: new Date(payment).toISOString().substring(0, 10),
			classes: newClasses,
		};

		void update(updatedClient);
	};

	return (
		<>
			{result != 'ok' ? (
				<Alert severity="error">Error: {result}</Alert>
			) : (
				<>
					<TableCell>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							size={1}
						/>
					</TableCell>
					<TableCell>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							size={1}
						/>
					</TableCell>
					<TableCell>
						<input
							type="text"
							value={surname}
							onChange={(e) => setSurname(e.target.value)}
							size={1}
						/>
					</TableCell>
					<TableCell>
						<input
							type="date"
							value={payment}
							onChange={(e) => setPayment(e.target.value)}
						/>
					</TableCell>
					<TableCell className="text-right">
						<MultiSelectBox
							value={[...newClasses]}
							onValueChange={setNewClasses}
							className="select-classes"
						>
							{classes.map((item) => (
								<MultiSelectBoxItem
									value={item.name}
									text={item.name}
									key={item.name}
								/>
							))}
						</MultiSelectBox>
					</TableCell>
					<TableCell className="text-right">
						<i className="bi bi-check2" onClick={() => handleSubmit()}></i>
						<i className="bi bi-x" onClick={() => setUpdating('')}></i>
					</TableCell>
				</>
			)}
		</>
	);
};
