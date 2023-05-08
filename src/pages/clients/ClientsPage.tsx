import { useEffect, useState } from 'react';
import { ClientsTable } from '../../components/clients/ClientsTable';
import { Client } from '../../models/Client';
import '../../styles/ClientsPage.css';
import { useAppSelector } from '../../hooks/store';
import { GetAllClients } from '../../services/ClientCalls';
import { Card } from '@tremor/react';
import { CreateClientForm } from '../../components/clients/CreateClientForm';

export default function ClientsPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [clients, setClients] = useState<Client[]>([]);
	const [creating, setCreating] = useState(false);
	const userToken = useAppSelector((state) => state.login.token);

	const getAllClients = async () => {
		setLoading(true);
		const callResult = await GetAllClients(userToken);
		if (callResult[0].id == '-1') setResult(callResult[0].email);
		else {
			setClients(callResult);
			setResult('ok');
		}
		setLoading(false);
	};

	const handleRetryClick = () => {
		void getAllClients();
	};

	useEffect(() => {
		if (clients.length == 0) void getAllClients();
	}, []);

	return (
		<div className="clients-page">
			<div className="title">
				<h1>Clients</h1>
				<button onClick={() => setCreating(true)}>Create New</button>
			</div>
			{creating && (
				<CreateClientForm setCreating={setCreating} token={userToken} />
			)}
			<Card>
				{loading && <p>Loading...</p>}
				{result != 'ok' && (
					<>
						<p style={{ color: 'red' }}>Error Fetching Data: ({result})</p>
						<button onClick={handleRetryClick}>Retry</button>
					</>
				)}
				{clients.length > 0 && <ClientsTable clients={clients} />}
			</Card>
		</div>
	);
}
