import { useEffect, useState } from 'react';
import { ClientsTable } from '../../components/clients/ClientsTable';
import '../../styles/ClientsPage.css';
import { Button, Card } from '@tremor/react';
import { CreateClientForm } from '../../components/clients/CreateClientForm';
import { useClientActions } from '../../hooks/useClientsActions';
import { Alert } from '@mui/material';

export default function ClientsPage() {
	const { deleteClientById, getClients } = useClientActions();

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const [toDelete, setToDelete] = useState(['']);

	useEffect(() => {
		const getAllClients = async () => {
			setLoading(true);
			setResult(await getClients());
			setLoading(false);
		};
		void getAllClients();
	}, []);

	const handleDelete = () => {
		void deleteClientById(toDelete[0]);
		setToDelete(['']);
	};

	return (
		<div className="clients-page">
			<div className="title">
				<h1>Clients</h1>
				<button onClick={() => setCreating(true)}>Create New</button>
			</div>
			{creating && <CreateClientForm setCreating={setCreating} />}
			<Card>
				{loading && <p>Loading...</p>}
				{result != 'ok' && (
					<>
						<p style={{ color: 'red' }}>Error Fetching Data: ({result})</p>
					</>
				)}
				{!loading && <ClientsTable setToDelete={setToDelete} />}
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
					You are about to delete client with email:{' '}
					<strong>{toDelete[1]}</strong>
				</Alert>
			)}
		</div>
	);
}
