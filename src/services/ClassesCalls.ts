import { CallError } from '../models/CallError';
import { Class, ClassResponse } from '../models/Class';

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
