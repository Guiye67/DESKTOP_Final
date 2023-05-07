import { useEffect, useState } from 'react';
import { ClientsTable } from '../../components/clients/ClientsTable';
import { Client } from '../../models/Client';
import '../../styles/Clients.css';
import { useAppSelector } from '../../hooks/store';
import { GetAllClients } from '../../services/ClientCalls';
import { Card } from '@tremor/react';

export default function ClientsPage() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState('');
	const [clients, setClients] = useState<Client[]>([]);
	const userToken = useAppSelector((state) => state.login.token);

	const getAllClients = async () => {
		console.log(userToken);
		setLoading(true);
		const callResult = await GetAllClients(userToken);
		if (callResult[0].id == '-1') setResult('ko');
		else setClients(callResult);
		setLoading(false);
	};

	useEffect(() => {
		if (clients.length == 0) void getAllClients();
	}, []);

	return (
		<div className="clients-page">
			<h1>Clients</h1>
			{loading && <Card>Loading...</Card>}
			{result == 'ko' && <p style={{ color: 'red' }}>Error fetching data</p>}
			{clients.length > 0 && <ClientsTable clients={clients} />}
		</div>
	);
}
