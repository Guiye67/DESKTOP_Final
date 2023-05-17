import { CallError } from '../models/CallError';
import {
	Suggestion,
	SuggestionNew,
	SuggestionResponse,
} from '../models/Suggestion';

export const GetAllSuggestions = async (token: string) => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};

	return fetch('http://localhost:8080/suggestions/', requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return [
					{
						id: '-1',
						title: err.message,
						client: '',
						description: '',
						resolved: false,
					},
				] as Suggestion[];
			}

			const data: SuggestionResponse[] =
				(await response.json()) as SuggestionResponse[];
			const output: Suggestion[] = [];
			data.forEach((sugg) => {
				output.push({
					id: sugg._id,
					title: sugg.title,
					client: sugg.client,
					description: sugg.description,
					resolved: sugg.resolved,
				} as Suggestion);
			});
			return output;
		}
	);
};

export const CreateSuggestion = (
	newSuggestion: SuggestionNew,
	token: string
) => {
	const requestOptions: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(newSuggestion),
	};

	return fetch('http://localhost:8080/suggestions/', requestOptions).then(
		async (response) => {
			if (response.status != 201) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};

export const UpdateSuggestion = (
	updatedSuggestion: Suggestion,
	token: string
) => {
	const requestOptions: RequestInit = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
		body: JSON.stringify(updatedSuggestion),
	};

	return fetch(
		`http://localhost:8080/suggestions/${updatedSuggestion.id}`,
		requestOptions
	).then(async (response) => {
		if (response.status > 299) {
			const err: CallError = (await response.json()) as CallError;
			return err.message;
		}

		return 'ok';
	});
};

export const DeleteSuggestions = (id: string, token: string) => {
	const requestOptions: RequestInit = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer: ${token}`,
		},
	};
	return fetch(`http://localhost:8080/suggestions/${id}`, requestOptions).then(
		async (response) => {
			if (response.status != 200) {
				const err: CallError = (await response.json()) as CallError;
				return err.message;
			}

			return 'ok';
		}
	);
};
