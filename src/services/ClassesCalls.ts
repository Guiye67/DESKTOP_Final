import { CallError } from '../models/CallError';
import { Class, ClassNew, ClassResponse } from '../models/Class';

export const GetAllClasses = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch('http://localhost:8080/classes/', requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return [
					{
						id: '-1',
						name: err.message,
						days: [],
						hour: '',
						duration: '',
						signedUp: [],
					},
				] as Class[];
			}

			const data: ClassResponse[] = (await response.json()) as ClassResponse[];
			const output: Class[] = [];
			data.forEach((item) => {
				output.push({
					id: item._id,
					name: item.name,
					days: item.days,
					hour: item.hour,
					duration: item.duration,
					signedUp: item.signedUp,
				} as Class);
			});
			return output;
		}
	);
};

export const CreateClass = (newClass: ClassNew, token: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(newClass),
	};

	return fetch('http://localhost:8080/classes/', requestOptions).then(
		async (response) => {
			if (response.status != 201) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};

export const UpdateClass = (updatedClass: Class, token: string) => {
	const requestOptions: RequestInit = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(updatedClass),
	};

	return fetch(
		`http://localhost:8080/classes/${updatedClass.id}`,
		requestOptions
	).then(async (response) => {
		if (response.status > 299) {
			const err: CallError = (await response.json()) as CallError;
			return err.message;
		}

		return 'ok';
	});
};

export const DeleteClass = (id: string, token: string) => {
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};
	return fetch(`http://localhost:8080/classes/${id}`, requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};
