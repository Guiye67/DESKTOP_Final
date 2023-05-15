export interface Class {
	id: string;
	name: string;
	days: string[];
	hour: string;
	duration: string;
	signedUp: string[];
}

export interface ClassResponse {
	_id: string;
	name: string;
	days: string[];
	hour: string;
	duration: string;
	signedUp: string[];
}

export interface ClassNew {
	name: string;
	days: string[];
	hour: string;
	duration: string;
	signedUp: string[];
}
