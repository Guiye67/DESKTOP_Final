import { Client, ClientNew } from '../models/Client';
import {
	CreateClient,
	DeleteClient,
	GetAllClients,
} from '../services/ClientCalls';
import { deleteClient, setClients } from '../store/clients/slice';
import { useAppDispatch } from './store';

export const useClientActions = () => {
	const dispatch = useAppDispatch();

	const getClients = async (token: string): Promise<string> => {
		const clients: Client[] = await GetAllClients(token);

		if (clients[0].id == '-1') return clients[0].email;

		dispatch(setClients(clients));
		return 'ok';
	};

	const createNewClient = async (
		newClient: ClientNew,
		token: string
	): Promise<string> => {
		const result = await CreateClient(newClient, token);

		if (result == 'ok') void getClients(token);

		return result;
	};

	const deleteClientById = async (id: string, token: string): Promise<void> => {
		const result = await DeleteClient(id, token);

		if (result == 'ok') dispatch(deleteClient(id));
	};

	return { getClients, createNewClient, deleteClientById };
};
