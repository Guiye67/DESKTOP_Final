import { Client, ClientNew } from '../models/Client';
import {
	CreateClient,
	DeleteClient,
	GetAllClients,
	UpdateClient,
} from '../services/ClientCalls';
import { deleteClient, setClients } from '../store/clients/slice';
import { useAppDispatch, useAppSelector } from './store';

export const useClientActions = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.login.token);

	const getClients = async (): Promise<string> => {
		const clients: Client[] = await GetAllClients(token);

		if (clients[0].id == '-1') return clients[0].email;

		dispatch(setClients(clients));
		return 'ok';
	};

	const createNewClient = async (newClient: ClientNew): Promise<string> => {
		const result = await CreateClient(newClient, token);

		if (result == 'ok') void getClients();

		return result;
	};

	const updateClient = async (updatedClient: Client): Promise<string> => {
		const result = await UpdateClient(updatedClient, token);

		if (result == 'ok') void getClients();

		return result;
	};

	const deleteClientById = async (id: string): Promise<void> => {
		const result = await DeleteClient(id, token);

		if (result == 'ok') dispatch(deleteClient(id));
	};

	return { getClients, createNewClient, updateClient, deleteClientById };
};
