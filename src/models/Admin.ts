export interface Admin {
	id: string;
	email: string;
	password: string;
	token: string;
}

export interface AdminResponse {
	adminFound: {
		_id: string;
		email: string;
		password: string;
	};
	token: string;
}

export interface CallError {
	message: string;
}
