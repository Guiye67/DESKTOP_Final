import { Class } from '../models/Class';
import { GetAllClasses } from '../services/ClassesCalls';
import { setClasses } from '../store/classes/slice';
import { useAppDispatch } from './store';

export const useClassesActions = () => {
	const dispatch = useAppDispatch();

	const getClasses = async (token: string): Promise<string> => {
		const classes: Class[] = await GetAllClasses(token);

		if (classes[0].id == '-1') return classes[0].name;

		dispatch(setClasses(classes));
		return 'ok';
	};

	return { getClasses };
};
