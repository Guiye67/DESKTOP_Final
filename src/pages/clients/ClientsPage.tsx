import { useEffect, useState } from 'react';
import { ClientsTable } from '../../components/clients/ClientsTable';
import '../../styles/ClientsPage.css';
import { useAppSelector } from '../../hooks/store';
import { Card } from '@tremor/react';
import { CreateClientForm } from '../../components/clients/CreateClientForm';
import { useClientActions } from '../../hooks/useClientsActions';

export default function ClientsPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('ok');
	const [creating, setCreating] = useState(false);
	const userToken = useAppSelector((state) => state.login.token);
	const { getClients } = useClientActions();

	const getAllClients = async () => {
		setLoading(true);
		setResult(await getClients(userToken));
		setLoading(false);
	};

	const handleRetryClick = () => {
		void getAllClients();
	};

	useEffect(() => {
		void getAllClients();
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
				{!loading && <ClientsTable token={userToken} />}
			</Card>
		</div>
	);
}
