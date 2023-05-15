import { Class, ClassNew } from '../models/Class';
import {
	CreateClass,
	DeleteClass,
	GetAllClasses,
	UpdateClass,
} from '../services/ClassesCalls';
import { deleteClass, setClasses } from '../store/classes/slice';
import { useAppDispatch, useAppSelector } from './store';

export const useClassesActions = () => {
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.login.token);

	const getClasses = async (): Promise<string> => {
		const classes: Class[] = await GetAllClasses(token);

		if (classes[0].id == '-1') return classes[0].name;

		dispatch(setClasses(classes));
		return 'ok';
	};

	const createNewClass = async (newClass: ClassNew): Promise<string> => {
		const result = await CreateClass(newClass, token);

		if (result == 'ok') void getClasses();

		return result;
	};

	const updateClass = async (updatedClass: Class): Promise<string> => {
		const result = await UpdateClass(updatedClass, token);

		if (result == 'ok') void getClasses();

		return result;
	};

	const deleteClassById = async (id: string): Promise<void> => {
		const result = await DeleteClass(id, token);

		if (result == 'ok') dispatch(deleteClass(id));
	};

	return { getClasses, createNewClass, updateClass, deleteClassById };
};
