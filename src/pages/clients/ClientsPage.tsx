import { useEffect, useState } from 'react';
import { ClientsTable } from '../../components/clients/ClientsTable';
import '../../styles/ClientsPage.css';
import { Card } from '@tremor/react';
import { CreateClientForm } from '../../components/clients/CreateClientForm';
import { useClientActions } from '../../hooks/useClientsActions';

export default function ClientsPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const { getClients } = useClientActions();

	useEffect(() => {
		const getAllClients = async () => {
			setLoading(true);
			setResult(await getClients());
			setLoading(false);
		};
		void getAllClients();
	}, []);

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
				{!loading && <ClientsTable />}
			</Card>
		</div>
	);
}
