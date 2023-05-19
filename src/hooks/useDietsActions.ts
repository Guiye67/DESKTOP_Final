import { Diet, DietNew } from '../models/Diet';
import {
	CreateDiet,
	DeleteDiet,
	GetAllDiets,
	UpdateDiet,
} from '../services/DietCalls';
import { deleteDiet, setDiets } from '../store/diets/slice';
import { useAppDispatch, useAppSelector } from './store';

export const useDietsActions = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.login.token);

	const getDiets = async (): Promise<string> => {
		const diets: Diet[] = await GetAllDiets(token);

		if (diets.length == 0) return 'No diets found in database';
		if (diets[0].id == '-1') return diets[0].client;

		dispatch(setDiets(diets));
		return 'ok';
	};

	const createNewDiet = async (newDiet: DietNew): Promise<string> => {
		const result = await CreateDiet(newDiet, token);

		if (result == 'ok') void getDiets();

		return result;
	};

	const updateDiet = async (updatedDiet: Diet): Promise<string> => {
		const result = await UpdateDiet(updatedDiet, token);

		if (result == 'ok') void getDiets();

		return result;
	};

	const deleteDietById = async (id: string): Promise<void> => {
		const result = await DeleteDiet(id, token);

		if (result == 'ok') dispatch(deleteDiet(id));
	};

	return { getDiets, createNewDiet, updateDiet, deleteDietById };
};
