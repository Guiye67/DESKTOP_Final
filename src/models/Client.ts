export interface Client {
	id: string;
	email: string;
	name: string;
	surname: string;
	payment: string;
	classes: string[];
}

export interface ClientResponse {
	_id: string;
	email: string;
	password: string;
	name: string;
	surname: string;
	payment: string;
	classes: string[];
}

export interface ClientNew {
	email: string;
	password: string;
	name: string;
	surname: string;
	payment: string;
	classes: string[];
}
