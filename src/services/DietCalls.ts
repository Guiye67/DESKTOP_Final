import { CallError } from '../models/CallError';
import { Diet, DietNew, DietResponse } from '../models/Diet';
import { IP } from '../utils/constants/constants';

export const GetAllDiets = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch(`${IP}/diets/`, requestOptions).then(async (response) => {
		if (response.status != 200) {
			const err: CallError = (await response.json()) as CallError;
			return [
				{
					id: '-1',
					client: err.message,
					age: '',
					gender: '',
					weight: '',
					height: '',
					objective: '',
					allergens: '',
					resolved: false,
				},
			] as Diet[];
		}

		const data: DietResponse[] = (await response.json()) as DietResponse[];
		const output: Diet[] = [];
		data.forEach((diet) => {
			output.push({
				id: diet._id,
				client: diet.client,
				age: diet.age,
				gender: diet.gender,
				weight: diet.weight,
				height: diet.height,
				objective: diet.objective,
				allergens: diet.allergens,
				resolved: diet.resolved,
			} as Diet);
		});
		return output;
	});
};

export const CreateDiet = (newDiet: DietNew, token: string) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(newDiet),
	};

	return fetch(`${IP}/diets/`, requestOptions).then(async (response) => {
		if (response.status != 201) {
			const err: CallError = (await response.json()) as CallError;
			return err.message;
		}

		return 'ok';
	});
};

export const UpdateDiet = (updatedDiet: Diet, token: string) => {
	const requestOptions: RequestInit = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(updatedDiet),
	};

	return fetch(`${IP}/diets/${updatedDiet.id}`, requestOptions).then(
		async (response) => {
			if (response.status > 299) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};

export const DeleteDiet = (id: string, token: string) => {
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};
	return fetch(`${IP}/diets/${id}`, requestOptions).then(async (response) => {
		if (response.status != 200) {
			const err: CallError = (await response.json()) as CallError;
			return err.message;
		}

		return 'ok';
	});
};
