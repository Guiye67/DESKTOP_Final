import { Suggestion, SuggestionNew } from '../models/Suggestion';
import {
	CreateSuggestion,
	DeleteSuggestions,
	GetAllSuggestions,
	UpdateSuggestion,
} from '../services/SuggestionCalls';
import { deleteSuggestions, setSuggestions } from '../store/suggestions/slice';
import { useAppDispatch, useAppSelector } from './store';

export const useSuggestionsActions = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.login.token);

	const getSuggestions = async (): Promise<string> => {
		const suggestions: Suggestion[] = await GetAllSuggestions(token);

		if (suggestions.length == 0) return 'No suggestions found in database';
		if (suggestions[0].id == '-1') return suggestions[0].title;

		dispatch(setSuggestions(suggestions));
		return 'ok';
	};

	const createNewSuggestion = async (
		newSuggestion: SuggestionNew
	): Promise<string> => {
		const result = await CreateSuggestion(newSuggestion, token);

		if (result == 'ok') void getSuggestions();

		return result;
	};

	const updateSuggestion = async (
		updatedSuggestion: Suggestion
	): Promise<string> => {
		const result = await UpdateSuggestion(updatedSuggestion, token);

		if (result == 'ok') void getSuggestions();

		return result;
	};

	const deleteSuggestionById = async (id: string): Promise<void> => {
		const result = await DeleteSuggestions(id, token);

		if (result == 'ok') dispatch(deleteSuggestions(id));
	};

	return {
		getSuggestions,
		createNewSuggestion,
		updateSuggestion,
		deleteSuggestionById,
	};
};
