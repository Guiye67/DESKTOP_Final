import { CallError } from '../models/CallError';
import { Client, ClientResponse } from '../models/Client';

export const GetAllClients = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch('http://localhost:8080/clients/', requestOptions)
		.then(async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				throw new Error(err.message);
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
		})
		.catch((err: string) => {
			console.log(err);
			return [
				{
					id: '-1',
					email: '',
					name: '',
					surname: '',
					payment: '',
					classes: [],
				},
			] as Client[];
		});
};
