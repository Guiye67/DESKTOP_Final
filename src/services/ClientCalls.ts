import { CallError } from '../models/CallError';
import { Client, ClientNew, ClientResponse } from '../models/Client';

export const GetAllClients = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch('http://localhost:8080/clients/', requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return [
					{
						id: '-1',
						email: err.message,
						name: '',
						surname: '',
						payment: '',
						classes: [],
					},
				] as Client[];
			}

			const data: ClientResponse[] =
				(await response.json()) as ClientResponse[];
			const output: Client[] = [];
			data.forEach((client) => {
				output.push({
					id: client._id,
					email: client.email,
					name: client.name,
					surname: client.surname,
					payment: client.payment,
					classes: client.classes,
				} as Client);
			});
			return output;
		}
	);
};

export const CreateClient = (newClient: ClientNew, token: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(newClient),
	};

	return fetch('http://localhost:8080/clients/', requestOptions).then(
		async (response) => {
			if (response.status != 201) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};

export const DeleteClient = (id: string, token: string) => {
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};
	return fetch(`http://localhost:8080/clients/${id}`, requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};
